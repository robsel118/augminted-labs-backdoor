import React from 'react'
import { GlowingBackground } from 'src/components/GlowingBackground'

export const WalletForm = () => {
  return (
    <div className='bg-panel mx-auto flex flex-col max-w-xl p-8'>
      <p className='font-glitch text-6xl mb-4'>Root Augminted Lab</p>
      <p className='font-glitch text-xl'>
        Scan a wallet to get insight on its current and claimable token, generated yield, and more.
      </p>
      <div className='mt-6'>
        <label htmlFor='wallet' className='block text-sm text-gray-300 font-medium mb-1'>
          Wallet
        </label>
        <input
          name='wallet'
          className='placeholder:text-black text-black px-4 py-2 rounded-lg w-full border-gray-300 border focus:ring-redioactive focus:border-redioactive'
          required
          value={''}
          type='text'
          placeholder='Enter wallet address'
        />
      </div>
      <div className='flex items-center gap-4 mt-6 mb-2'>
        <input type='checkbox' className='text-redioactive focus:ring-redioactive' name='remember-me' />
        <label htmlFor='remember-me' className='text-md'>
          Remember wallet address next time
        </label>
      </div>
      <GlowingBackground>
        <button className='w-full'>Scan wallet</button>
      </GlowingBackground>
    </div>
  )
}
