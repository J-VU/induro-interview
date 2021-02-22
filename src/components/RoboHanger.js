import React, { Fragment, useState, useEffect } from 'react'
import RobotDB from '../utility/Axios'
import { toast } from 'react-toastify'

export default function RoboHanger() {
  let defaultRobot = [{}]
  const [robots, setRobots] = useState(defaultRobot)
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res = await RobotDB.get('/robots')
    setRobots(res.data)
  }
  const robotList = robots.map((item) => (
    <option key={item.name}>{item.name}</option>
  ))
  const [{ name, color, attack, defense }, setFormData] = useState({
    name: '',
    color: 'None',
    attack: '',
    defense: ''
  })
  const onChange = (event) => {
    setFormData({
      name,
      color,
      attack,
      defense,
      [event.target.name]: event.target.value
    })
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ name, color, attack, defense })
    try {
      const res = await RobotDB.put('/robot', body, config)
      if (res.status === 200) {
        toast.success(`Robot [ ${name} ] has been modified!`)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Fragment>
      <div className='mx-2 p-3 card'>
        <p className='title'>Robo Hanger</p>
        <button className='button is-primary mb-2' onClick={getData}>
          Refresh
        </button>
        <div className='card p-3 has-background-light'>
          <form onSubmit={(event) => onSubmit(event)}>
            <label className='label subtitle'>Active Robot</label>
            <div className='select is-info mb-3'>
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

            <div className='field'>
              <label className='label'>Color</label>
              <div className='control'>
                <div className='select'>
                  <select
                    name='color'
                    value={color}
                    onChange={(event) => onChange(event)}
                    required>
                    <option value='None'>None</option>
                    <option value='Red'>Red</option>
                    <option value='Green'>Green</option>
                    <option value='Blue'>Blue</option>
                    <option value='Black'>Black</option>
                    <option value='White'>White</option>
                    <option value='RainbowRGB'>RainbowRGB</option>
                  </select>
                </div>
              </div>
            </div>

            <label className='label'>Attack</label>
            <input
              className='input'
              type='number'
              placeholder='Attack'
              name='attack'
              value={attack}
              onChange={(event) => onChange(event)}
              required
            />
            <label className='label'>Defense</label>
            <input
              className='input'
              type='number'
              placeholder='Defense'
              name='defense'
              value={defense}
              onChange={(event) => onChange(event)}
              required
            />

            <div className='mt-3 field'>
              <div className='control'>
                <button type='submit' className='button is-link'>
                  Modify
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
