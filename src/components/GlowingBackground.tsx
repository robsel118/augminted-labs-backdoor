import React, { FC, ReactNode } from 'react'
import cn from 'classnames'
interface GlowingBackgroundProps {
  children?: ReactNode
  glow?: boolean
}
export const GlowingBackground: FC<GlowingBackgroundProps> = ({ children, glow = true }) => {
  return (
    <div className='w-full my-4 '>
      <div className='relative group'>
        <div
          className={cn(
            'absolute bg-gradient-to-r from-redioactive to-green-corrosive rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate',
            {
              '-inset-0.5': glow
            }
          )}
        ></div>
        <div className='relative bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600'>
          {children}
        </div>
      </div>
    </div>
  )
}
