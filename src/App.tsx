import React from 'react'
import './App.css'
import { NavBar } from 'src/containers/NavBar'
import { WalletForm } from 'src/containers/WalletForm'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './config/routes'
import { WalletPage } from './pages/wallet'

function App() {
  return (
    <div className='h-screen w-screen before:fixed before:h-screen before:w-screen before:bg-sorashima before:top-0 before:left-0 before:brightness-50 text-color'>
      <div className='relative bg-gradient-black h-full grid grid-cols-[300px,_1fr] auto-cols-min py-8'>
        <div className='block'>
          <NavBar />
        </div>
        <div className='block px-8'>
          <Routes>
            <Route path={RouteNames.HOME} element={<WalletForm />} />

            <Route path={RouteNames.WALLET_ID} element={<WalletPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
