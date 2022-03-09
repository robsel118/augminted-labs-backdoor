import React, { FC, ReactNode } from 'react'

interface NavLnksProps {
  chrildren?: ReactNode
  href: string
}
export const NavLink: FC<NavLnksProps> = ({ children, href }) => {
  return (
    <li className='rounded-md hover:bg-panel-brighter my-3 block'>
      <a
        className='appearance-none font-glitch text-xl ml-5 my-3 leading-10'
        target='_blank'
        href={href}
      >
        {children}
      </a>
    </li>
  )
}
