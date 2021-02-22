import React, { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import RobotDB from '../utility/Axios'

export default function RoboJunkYard() {
  let defaultRobot = [{}]

  useEffect(() => {
    getData()
  }, [])
  const [robots, setRobots] = useState(defaultRobot)

  const getData = async () => {
    const res = await RobotDB.get('/robots')
    setRobots(res.data)
  }
  const destroyRobot = async (name) => {
    try {
      const res = await RobotDB.delete('robot', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          name
        }
      })
      if (res.status === 200) {
        toast.error(`Robot [${name}] destroyed!`)
      }
      getData()
    } catch (error) {
      console.error(error.message)
    }
  }
  const robotList = robots.map((item) => (
    <tr key={item.name} className='is-capitalized'>
      <td>{item.name}</td>
      <td>{item.color}</td>
      <td>{item.attack}</td>
      <td>{item.defense}</td>
    </tr>
  ))
  const [{ name }, setFormData] = useState({
    name: ''
  })
  const onChange = (event) => {
    setFormData({
      name,
      [event.target.name]: event.target.value
    })
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    destroyRobot(name)
  }

  return (
    <Fragment>
      <div className='mx-2 p-3 card'>
        <p className='title'>Robo Junk Yard</p>
        <button className='button is-primary' onClick={getData}>
          Refresh
        </button>
        <label className='label ml-2 mt-4'>Robots Enlisted:</label>
        <table className='table is-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Attack</th>
              <th>Defense</th>
            </tr>
          </thead>
          <tbody>{robotList}</tbody>
        </table>
        <div className='card p-3 has-background-light'>
          <form onSubmit={(event) => onSubmit(event)}>
            <label className='label'>Destroy Robot</label>
            <input
              className='input'
              type='text'
              placeholder='Insert Robot Name'
              name='name'
              value={name}
              onChange={(event) => onChange(event)}
              required
            />
            <div className='mt-3 field'>
              <div className='control'>
                <button type='submit' className='button is-link'>
                  Destroy
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
