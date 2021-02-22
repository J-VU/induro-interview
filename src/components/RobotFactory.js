import React, { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import RobotDB from '../utility/Axios'

const RobotFactory = () => {
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
      const res = await RobotDB.post('/robot/create', body, config)
      if (res.status === 200) {
        toast.success(`Factory Built [${name}] successfully!`)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Fragment>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className='card p-3'>
          <p className='title'>Robot Factory</p>
          <div className='card p-2 has-background-light'>
            <div className='field'>
              <label className='label'>Name</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Generic Robot'
                  name='name'
                  value={name}
                  onChange={(event) => onChange(event)}
                  required
                />
              </div>
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
            <div className='field'>
              <label className='label'>Attack</label>
              <div className='control'>
                <input
                  className='input'
                  type='number'
                  placeholder='100'
                  name='attack'
                  value={attack}
                  onChange={(event) => onChange(event)}
                  required
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Defense</label>
              <div className='control'>
                <input
                  className='input'
                  type='number'
                  placeholder='100'
                  name='defense'
                  value={defense}
                  onChange={(event) => onChange(event)}
                  required
                />
              </div>
            </div>
            <div className='field is-grouped'>
              <div className='control'>
                <button className='button is-link'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default RobotFactory
