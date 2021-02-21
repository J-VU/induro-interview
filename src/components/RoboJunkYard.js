import React, { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import RobotDB from '../utility/Axios'
// import {
//   useRoboJunkYard,
//   useRoboJunkYardUpdate
// } from '../context/RobotFactoryContext'

export default function RoboJunkYard() {
  // const junkYard = useRoboJunkYard()
  // const updateJunkYard = useRoboJunkYardUpdate()

  let defaultRobot = [
    {
      _id: '6031c75921372639f61d7995',
      name: 'First Robot',
      color: 'NEAT',
      attack: 2002,
      defense: 9,
      date: '2021-02-21T02:37:13.776Z',
      __v: 0
    },
    {
      _id: '6031d80b0fb6d340b627f08d',
      name: 'Robot 1',
      color: 'PURPLE',
      attack: 100,
      defense: 50,
      date: '2021-02-21T03:48:27.897Z',
      __v: 0
    }
  ]

  useEffect(() => {
    getData()
  }, [])

  const [robots, setRobots] = useState(defaultRobot)

  const getData = async () => {
    const res = await RobotDB.get('/robots')
    console.log(res.data)
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
      console.log(res.data)
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
    console.log(`To delete-> ${name}`)
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
