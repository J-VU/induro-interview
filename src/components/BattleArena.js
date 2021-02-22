import React, { Fragment, useState, useEffect } from 'react'
import RobotDB from '../utility/Axios'
import { toast } from 'react-toastify'

export default function BattleArena() {
  let defaultRobot = [{}]

  const [robots, setRobots] = useState(defaultRobot)

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res = await RobotDB.get('/robots')
    setRobots(res.data)
  }
  const [{ name, vs }, setFormData] = useState({
    name: '',
    vs: ''
  })
  const [
    { name1, win1, loss1, name2, win2, loss2 },
    setBattleResult
  ] = useState({
    name1: '',
    name2: '',
    win1: '',
    win2: '',
    loss1: '',
    loss2: ''
  })
  const robotList = robots.map((item) => (
    <option key={item.name}>{item.name}</option>
  ))
  const battleResult = (
    <Fragment>
      <div className='p-2 '>
        <label className='label'>Battle Results</label>
        <div class='level card p-2 has-background-danger has-text-white'>
          <span className='level-left has-text-weight-semibold'>
            {name1 ? name1 : 'Active'}
          </span>
          <div className='level-right'>
            <p className='tag is-white mx-2'>
              W:<span>{win1 ? win1 : ' -- '}</span>
            </p>

            <p className='tag is-white'>
              L:<span>{loss1 ? loss1 : ' -- '}</span>
            </p>
          </div>
        </div>
        <div class='level card p-2 has-background-info has-text-white'>
          <span className='level-left has-text-weight-semibold'>
            {name2 ? name2 : 'Challenger'}
          </span>
          <div className='level-right'>
            <p className='tag is-white mx-2'>
              W:<span>{win2 ? win2 : ' -- '}</span>
            </p>
            <p className='tag is-white'>
              L:<span>{loss2 ? loss2 : ' -- '}</span>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
  const onChange = (event) => {
    setFormData({
      name,
      vs,
      [event.target.name]: event.target.value
    })
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    if (name === '' || vs === '') {
      toast.warning(`Need 2 people to fight.`)
      return
    }
    if (name === vs) {
      toast.warning(`Robot cannot fight itself`)
      return
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ robot: name, vs })
    try {
      const res = await RobotDB.post('/battle', body, config)
      const r1 = res.data.r1_battle
      const r2 = res.data.r2_battle

      if (res.status === 200) {
        toast.success(`Robots battle complete, see battle results!`)
        setBattleResult({
          name1: r1.name,
          win1: r1.win,
          loss1: r1.loss,
          name2: r2.name,
          win2: r2.win,
          loss2: r2.loss
        })
      }
    } catch (error) {
      console.error('error')
      console.error(error.message)
    }
  }

  return (
    <Fragment>
      <div className='mx-2 p-3 card'>
        <p className='title'>Battle Arena</p>
        <button className='button is-primary mb-2' onClick={getData}>
          Refresh
        </button>
        <div className='card p-3 has-background-light'>
          <form onSubmit={(event) => onSubmit(event)}>
            <div className='field'>
              <label className='label'>Active Robot</label>
              <div className='select is-danger mb-3'>
                <select
                  placeholder='None'
                  name='name'
                  value={name}
                  onChange={(event) => onChange(event)}
                  required>
                  <option>None</option>
                  {robotList}
                </select>
              </div>
            </div>
            <p className='subtitle font-weight-bold'>Vs</p>
            <div className='field'>
              <label className='label'>Challenger</label>
              <div className='select is-info mb-3'>
                <select
                  placeholder='None'
                  name='vs'
                  value={vs}
                  onChange={(event) => onChange(event)}
                  required>
                  <option>None</option>
                  {robotList}
                </select>
              </div>
            </div>
            <div className='mt-3 field'>
              <div className='control'>
                <button type='submit' className='button is-primary'>
                  Battle
                </button>
              </div>
            </div>
            <div className='card'>{battleResult}</div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
