import React, { useEffect } from 'react'
import { eachDayOfInterval, subDays, format } from 'date-fns'
import Moralis from 'moralis'
import { useTokenPrice } from 'react-moralis'
import { Token, TokenAddress } from 'src/config/constants'
export const DexGraph = () => {
  const dates = eachDayOfInterval({ start: subDays(new Date(), 7), end: new Date() })
  const { fetchTokenPrice } = useTokenPrice({
    address: TokenAddress[Token.RWASTE],
    chain: 'eth'
  })
  useEffect(() => {
    Promise.all(
      dates.map((date) =>
        Moralis.Web3API.native.getDateToBlock({ date: format(date, 'yyyy-MM-dd'), chain: 'eth' })
      )
    ).then((results) =>
      Promise.all(
        results.map((result) =>
          fetchTokenPrice({
            params: { to_block: result.block, address: TokenAddress[Token.RWASTE], chain: 'eth' }
          })
        )
      ).then((blocks) => console.log(blocks))
    )
  }, [])
  return <div></div>
}
