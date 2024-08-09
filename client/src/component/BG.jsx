import React from 'react'

function BG({ print }) {
  return (
    <div className="background-text absolute inset-0 flex justify-center  items-center pointer-events-none">
        <p className="text-9xl text-neutral-900 font-bold drop-shadow-lg">{print}</p>
    </div>
  )
}

export default BG