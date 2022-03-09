import React from 'react'
import './App.css'
import { GlowingBackground } from './components/GlowingBackground'
import { NavBar } from './container/NavBar'

function App() {
  return (
    <div className='h-screen w-screen before:fixed before:h-screen before:w-screen before:bg-sorashima before:top-0 before:left-0 before:brightness-50 text-color'>
      <div className='relative bg-gradient-black h-full grid grid-cols-[300px,_1fr] py-8'>
        <NavBar />
        <div className='bg-panel mx-auto flex flex-col max-w-xl p-8'>
          <p className='font-glitch text-6xl mb-4'>Root Augminted Lab</p>
          <p className='font-glitch text-xl'>
            Scan a wallet to get insight on its current and claimable token, generated yield, and more.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
