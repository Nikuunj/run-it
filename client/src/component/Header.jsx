import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='bg-neutral-900 text-2xl py-2 px-2 text-zinc-400 font-bold drop-shadow-2xl shadow-zinc-500 flex justify-between'>
      <p>
      Run-it
      </p>

      <p className=' space-x-4 me-4'>
        <span><Link to='/'>Js</Link></span>
        <span><Link to='/merge'>Frontend</Link></span>
      </p>
    </div>
  )
}

export default Header