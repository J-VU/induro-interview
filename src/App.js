import React, { Fragment } from 'react'

import NavBar from './components/NavBar'
import RobotFactory from './components/RobotFactory'
import RoboJunkYard from './components/RoboJunkYard'
import RoboHanger from './components/RoboHanger'
import BattleArena from './components/BattleArena'

import 'bulma/css/bulma.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <section className='container'>
      <NavBar />
      <ToastContainer position='top-center' />
      <div className='columns'>
        <RobotFactory />
        <RoboJunkYard />
        <RoboHanger />
        <BattleArena />
      </div>
    </section>
  )
}

export default App
