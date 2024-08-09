import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='backdrop-blur-sm bg-white/5 text-2xl py-2 px-2 fixed top-4 left-[10vw] rounded-lg z-50 w-[80vw] text-zinc-400 font-bold drop-shadow-2xl shadow-zinc-500 flex justify-between'>
      <p>
      <Link to='/'>
      Run-it
      </Link>
      </p>
      <p className=' space-x-4 me-4'>
        <span className=' hover:underline hover:decoration-zinc-600 duration-300 no-underline'><Link to='/'>Js</Link></span>
        <span className=' hover:underline hover:decoration-zinc-600 duration-300 no-underline'><Link to='/merge'>Frontend</Link></span>
      </p>
    </div>
  )
}

export default Header