import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlowingBackground } from 'src/components/GlowingBackground'
import { RouteNames } from 'src/config/routes'

const WALLET_KEY = 'walletAddress'
export const WalletForm = () => {
  const [wallet, setWallet] = useState<string>('')
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const navigate = useNavigate()
  const onSubmit = () => {
    // TODO: remove comments
    // if (rememberMe) {
    //   localStorage.setItem(WALLET_KEY, wallet)
    // } else {
    //   localStorage.removeItem(WALLET_KEY)
    // }
    navigate(`${RouteNames.WALLET}/${wallet}`)
  }

  useEffect(() => {
    const savedWallet = localStorage.getItem(WALLET_KEY)
    if (savedWallet) navigate(`${RouteNames.WALLET}/${savedWallet}`)
  }, [])
  return (
    <div className='bg-panel mx-auto flex flex-col max-w-xl p-8'>
      <p className='font-glitch text-6xl mb-4'>Root Augminted Lab</p>
      <p className='font-glitch text-xl'>
        Scan a wallet to get insight on its current and claimable token, generated yield, and more.
      </p>
      <div className='mt-6'>
        <label htmlFor='wallet-field' className='block text-sm text-gray-300 font-medium mb-1'>
          Wallet
        </label>
        <input
          id='wallet-field'
          name='wallet-field'
          className='placeholder:text-black text-black px-4 py-2 rounded-lg w-full border-gray-300 border focus:ring-redioactive focus:border-redioactive'
          required
          value={wallet}
          onChange={(event) => setWallet(event.target.value)}
          type='text'
          placeholder='Enter wallet address'
        />
      </div>
      <div className='flex items-center gap-4 mt-6 mb-2'>
        <input
          id='remember-me'
          type='checkbox'
          className='text-redioactive focus:ring-redioactive'
          name='remember-me'
          checked={rememberMe}
          onChange={() => setRememberMe((previousState) => !previousState)}
        />
        <label htmlFor='remember-me' className='text-md'>
          Remember wallet address next time
        </label>
      </div>
      <GlowingBackground>
        <button
          onClick={onSubmit}
          disabled={wallet.match(/^0x[a-fA-F0-9]{40}$/) ? false : true}
          className='w-full'
        >
          Scan wallet
        </button>
      </GlowingBackground>
    </div>
  )
}
