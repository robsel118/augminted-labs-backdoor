import React, { FC } from 'react'
import { Token } from 'src/config/constants'
import { TokenResponse } from 'src/context/tokenPriceContext'
import { ethers } from 'ethers'

interface BalanceCardProps {
  title: string
  quantity: number
  token: Token
  tokenPrice: TokenResponse
}

export const BalanceCard: FC<BalanceCardProps> = ({ title, quantity, token, tokenPrice }) => {
  const tokenPriceInEthers = parseFloat(ethers.utils.formatEther(tokenPrice.nativePrice!.value))

  return (
    <div className='bg-panel p-4 rounded-sm border-l-4 border-green-corrosive flex flex-col gap-2'>
      <p className='text-md text-white font-semibold'>
        {title} ({quantity.toFixed(2)} ${token})
      </p>
      <span className='text-xl font-extrabold text-green-corrosive'>
        {(quantity * tokenPriceInEthers).toFixed(4)} ETH
      </span>
      <span className='text-sm text-color font-semibold'>
        {(quantity * tokenPrice.usdPrice).toFixed(2)} $
      </span>
    </div>
  )
}
