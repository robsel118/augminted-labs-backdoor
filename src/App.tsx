import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { NavBar } from 'src/containers/NavBar'
import { WalletForm } from 'src/containers/WalletForm'
import { RouteNames } from 'src/config/routes'
import { WalletPage } from 'src/pages/wallet'
import { TokenPriceContext, TokenResponse } from 'src/context/tokenPriceContext'

function App() {
  const [rwastePrice, setRwastePrice] = useState<TokenResponse>()
  return (
    <TokenPriceContext.Provider value={{ rwasteToken: { value: rwastePrice, setValue: setRwastePrice } }}>
      <div className='h-screen w-screen before:fixed before:h-screen before:w-screen before:bg-sorashima before:top-0 before:left-0 before:brightness-50 text-color'>
        <div className='relative bg-gradient-black h-full grid grid-cols-1 lg:grid-cols-[300px,_1fr] auto-cols-min py-8 px-8'>
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
    </TokenPriceContext.Provider>
  )
}

export default App
