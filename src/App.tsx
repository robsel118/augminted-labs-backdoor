import React, { useEffect } from 'react'
import './App.css'
import { TokenPrice } from './components/TokenPrice'
import { Token } from './config/constants'

function App() {
  return (
    <div className='h-screen w-screen before:fixed before:h-screen before:w-screen before:bg-sorashima before:top-0 before:left-0 before:brightness-50 text-white'>
      <div className='relative bg-gradient-black h-full'>
        <h1>Augminted-backdoor</h1>
        <div>
          <TokenPrice token={Token.RWASTE} />
        </div>
      </div>
    </div>
  )
}

export default App
