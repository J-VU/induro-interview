const express = require('express')
const router = express.Router()

const Robot = require('../models/Robot')
const BattleResult = require('../models/BattleResults')

/** CREATE ROBOTO */
router.post('/robot/create', async (req, res) => {
  const { name, color, attack, defense } = req.body
  try {
    /** Check if exists */
    let robot = await Robot.findOne({
      name
    })
    if (robot) {
      return res.status(400).json({
        error: true,
        message: 'Robot already exists.'
      })
    }
    robot = new Robot({
      name,
      color,
      attack,
      defense
    })
    await robot.save()
    return res.json(robot)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error.')
  }
})

/** GET ROBOTO */
router.get('/robot', async (req, res) => {
  const { name } = req.body
  try {
    /** Check if exists */
    let robot = await Robot.findOne({
      name
    })
    if (!robot) {
      return res.status(400).json({
        error: true,
        message: 'Robot not found.'
      })
    }
    return res.json(robot)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error.')
  }
})

/** GET ALL ROBOTO */
router.get('/robots', async (req, res) => {
  const { name } = req.body
  try {
    let robots = await Robot.find()
    if (!robots) {
      return res.status(400).json({
        error: true,
        message: 'No robots not found.'
      })
    }
    return res.json(robots)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error.')
  }
})

/** UPDATE ROBOTO */
router.put('/robot', async (req, res) => {
  const { name, color, attack, defense } = req.body
  try {
    /** Check if exists */
    let robot = await Robot.findOne({
      name
    })

    if (!robot) {
      return res.status(400).json({
        error: true,
        message: 'Robot not found.'
      })
    }

    robot = await Robot.findOneAndUpdate(
      { name: robot.name },
      { name, color, attack, defense },
      { new: true }
    )

    await robot.save()

    return res.json(robot)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send(err.message)
  }
})

/** DELETE ROBOTO */
router.delete('/robot', async (req, res) => {
  const { name } = req.body
  try {
    /** Check if exists */
    let robot = await Robot.findOne({
      name
    })
    if (!robot) {
      return res.status(400).json({
        error: true,
        message: 'Robot not found.'
      })
    }
    await Robot.findOneAndRemove({
      _id: robot._id
    })

    return res.json(robot)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error.')
  }
})

/** BATTLE & RESULT ROBOTO */
router.post('/battle', async (req, res) => {
  const { robot, vs } = req.body
  console.log(robot)
  try {
    /** Check if exists */
    let robotOne = await Robot.findOne({
      name: robot
    })
    console.log(`${robotOne}`)

    let robotTwo = await Robot.findOne({
      name: vs
    })
    console.log(`${robotOne} vs ${robotTwo}`)

    if (!robotOne || !robotTwo) {
      return res.status(400).json({
        error: true,
        message: 'Robot has paper hands and never showed.'
      })
    }

    const r1_name = robotOne.name
    const r2_name = robotTwo.name

    const r1_stats = robotOne.attack + robotOne.defense * Math.random()
    const r2_stats = robotTwo.attack + robotTwo.defense * Math.random()

    let r1_result = await BattleResult.findOne({
      name: robot
    })
    let r2_result = await BattleResult.findOne({
      name: vs
    })

    if (!r1_result) {
      r1_result = await new BattleResult({ name: robot, win: 0, loss: 0 })
      await r1_result.save()
    }
    if (!r2_result) {
      r2_result = await new BattleResult({ name: vs, win: 0, loss: 0 })
      await r2_result.save()
    }

    /** PLAYER 1 WIN */
    if (r1_stats > r2_stats) {
      const r1_battle = await BattleResult.findOneAndUpdate(
        { name: robot },
        {
          name: robot,
          win: r1_result.win + 1,
          loss: r1_result.loss
        },
        { new: true }
      )
      await r1_battle.save()

      const r2_battle = await BattleResult.findOneAndUpdate(
        { name: vs },
        {
          name: r2_result.name,
          win: r2_result.win,
          loss: r2_result.loss + 1
        },
        { new: true }
      )
      await r2_battle.save()

      return res.json({ r1_battle, r2_battle })

      /** PLAYER 2 WIN */
    } else if (r1_stats < r2_stats) {
      const r1_battle = await BattleResult.findOneAndUpdate(
        { name: robot },
        {
          name: robot,
          win: r1_result.win,
          loss: r1_result.loss + 1
        },
        { new: true }
      )
      await r1_battle.save()
      console.log(r1_battle)

      const r2_battle = await BattleResult.findOneAndUpdate(
        { name: vs },
        {
          name: r2_result.name,
          win: r2_result.win + 1,
          loss: r2_result.loss
        },
        { new: true }
      )
      await r2_battle.save()
      console.log(r2_battle)

      return res.json({ r1_battle, r2_battle })
    }
  } catch (err) {
    console.error(err.message)
    return res.status(500).send(err.message)
  }
})

/** Health Check */
router.get('/', (req, res) => res.send('API Server Running...'))

module.exports = router
