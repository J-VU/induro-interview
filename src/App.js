import React, { Fragment } from 'react'

/** Components */
import RobotFactory from './components/RobotFactory'
import RoboJunkYard from './components/RoboJunkYard'
import RoboHanger from './components/RoboHanger'

import 'bulma/css/bulma.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BattleArena from './components/BattleArena'

/** Providers */
// import { RoboJunkYardProvider } from './context/RobotFactoryContext'

function App() {
  return (
    <div className='container'>
      <ToastContainer position='top-center' />
      <div className='columns mt-2'>
        <RobotFactory className='column' />
        <RoboJunkYard className='column' />
        <RoboHanger/>
        <BattleArena />
      </div>
    </div>
  )
}

export default App
