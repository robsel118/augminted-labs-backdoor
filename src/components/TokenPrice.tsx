import React from 'react'
import { useTokenPrice } from 'react-moralis'
import { Token, TokenAddress } from '../config/constants'
import cn from 'classnames'
interface TokenPriceProps {
  token: Token
}

export const TokenPrice = ({ token }: TokenPriceProps) => {
  const { data, isFetching } = useTokenPrice({ address: TokenAddress[token], chain: 'eth' })
  return (
    <div className='flex flex-col'>
      <div className='font-semibold uppercase mb-2'>{token}</div>
      <div
        className={cn({
          'animate-pulse': isFetching
        })}
      >
        {data?.formattedUsd || '$0.00'} | {data?.formattedNative || '0.00 ETH'}
      </div>
    </div>
  )
}
