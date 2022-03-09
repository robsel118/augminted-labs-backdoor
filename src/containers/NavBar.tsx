import React from 'react'
import logo from 'src/assets/kaiju-kingz-logo-glitched.gif'
import { NavLink } from 'src/components/NavLink'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faExternalLink, faChartLine } from '@fortawesome/free-solid-svg-icons'
export const NavBar = () => (
  <nav className=' bg-panel mx-auto py-3 mb-6 ml-8'>
    <div className='my-8'>
      <img src={logo} className='px-8 pb-1' />
      <h1 className='font-glitch text-green-corrosive font-semibold text-center'>Dashboard (root)</h1>
    </div>

    <ul className='px-8'>
      <NavLink href='https://opensea.io/collection/kaijumutant'>
        Mutants OpenSea <Icon className='ml-2' size='xs' icon={faExternalLink} />
      </NavLink>
      <NavLink href='https://opensea.io/collection/kaiju-kingz'>
        KaijuKingz OpenSea <Icon className='ml-2' size='xs' icon={faExternalLink} />
      </NavLink>
      <NavLink href='https://dashboard.kaijukingz.io'>
        Dashboard App <Icon className='ml-2' size='xs' icon={faExternalLink} />
      </NavLink>
      <NavLink href='https://www.dextools.io/app/ether/pair-explorer/0x3536c21b5c7b0ec72a58e7bce46b7fadef10f941'>
        Dextools <Icon className='ml-2' size='xs' icon={faChartLine} />
      </NavLink>
    </ul>
  </nav>
)
