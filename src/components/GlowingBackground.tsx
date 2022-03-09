import React, { FC, ReactNode } from 'react'

export const GlowingBackground: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className='py-4 w-full'>
      <div className='relative group'>
        <div className='absolute -inset-0.5 bg-gradient-to-r from-redioactive to-green-corrosive rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt'></div>
        <div className='relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600'>
          {children}
        </div>
      </div>
    </div>
  )
}
