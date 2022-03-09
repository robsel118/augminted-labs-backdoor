import React from 'react'
import './App.css'
import { NavBar } from 'src/containers/NavBar'
import { WalletForm } from 'src/containers/WalletForm'

function App() {
  return (
    <div className='h-screen w-screen before:fixed before:h-screen before:w-screen before:bg-sorashima before:top-0 before:left-0 before:brightness-50 text-color'>
      <div className='relative bg-gradient-black h-full grid grid-cols-[300px,_1fr] py-8'>
        <NavBar />
        <WalletForm />
      </div>
    </div>
  )
}

export default App
