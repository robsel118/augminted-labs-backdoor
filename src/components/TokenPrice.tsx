import React, { useContext, useEffect } from 'react'
import { useTokenPrice } from 'react-moralis'
import { Token, TokenAddress } from '../config/constants'
import cn from 'classnames'
import { TokenPriceContext } from 'src/context/tokenPriceContext'
interface TokenPriceProps {
  token: Token
}

export const TokenPrice = ({ token }: TokenPriceProps) => {
  const { data, isFetching } = useTokenPrice({ address: TokenAddress[token], chain: 'eth' })

  const { rwasteToken } = useContext(TokenPriceContext)

  useEffect(() => {
    if (data) {
      if (token === Token.RWASTE) {
        rwasteToken.setValue(data)
      }
    }
  }, [data])
  return (
    <div className='flex flex-col my-4'>
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
