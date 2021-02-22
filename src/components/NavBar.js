import React, { Fragment } from 'react'

const NavBar = () => {
  return (
    <Fragment>
      <nav
        className='navbar is-transparent mb-4'
        role='navigation'
        aria-label='main navigation'>
        <div className='navbar-brand'>
          <h1 className='title mx-5 my-3'>Induro Robotica</h1>
        </div>

        <div id='navbar' className='navbar-menu'>
          <div className='navbar-end'></div>
        </div>
      </nav>
    </Fragment>
  )
}

export default NavBar
