import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
        <header>
          <div className='flex justify-between py-4 px-4 bg-slate-500'>
          <div className="left">
              <img src="" alt="" />
              <p>Atisha</p>
            </div>
            <div className="center flex space-around">
              <p className='px-2'>Roadmap</p>
              <p className='px-2'>Resource</p>
              <p className='px-2'>Sessions</p>
            </div>
            <div className="right">
                <div className="bell">
                </div>
                <Link to='/signup'>
                <div className="signup">
                  <button>Signup</button>
                </div>
                </Link>
            </div>
          </div>
        </header>
    </>
  )
}

export default Navbar