import React, { useEffect, useState } from 'react'
import { eachDayOfInterval, subDays, format } from 'date-fns'
import Moralis from 'moralis'
import { useTokenPrice } from 'react-moralis'
import { Token, TokenAddress } from 'src/config/constants'
import { ResponsiveContainer, LineChart, Line, YAxis, XAxis, Tooltip } from 'recharts'
interface GraphData {
  date: string
  rwaste: number
}

export const DexGraph = () => {
  const today = new Date()
  const dates = eachDayOfInterval({ start: subDays(new Date(), 6), end: subDays(today, 1) })
  const { fetchTokenPrice } = useTokenPrice({
    address: TokenAddress[Token.RWASTE],
    chain: 'eth'
  })

  const [data, setData] = useState<GraphData[]>([] as GraphData[])

  useEffect(() => {
    Promise.all(
      dates.map((date) =>
        Moralis.Web3API.native.getDateToBlock({ date: date.toDateString(), chain: 'eth' })
      )
    ).then((results) =>
      Promise.all([
        ...results.map((result) =>
          fetchTokenPrice({
            params: { to_block: result.block, address: TokenAddress[Token.RWASTE], chain: 'eth' }
          })
        ),
        fetchTokenPrice({
          params: { address: TokenAddress[Token.RWASTE], chain: 'eth' }
        })
      ]).then((blocks) => {
        setData(
          blocks.map((block, index) => ({
            date: format(dates[index] || today, 'dd LLL'),
            rwaste: block?.usdPrice || 0
          }))
        )
      })
    )
  }, [])
  return (
    <div className='bg-panel w-full h-96 p-4'>
      <p className='text-xl text-white pb-2 font-semibold'>Last 7 days</p>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={500}
          height={500}
          data={data}
          margin={{
            top: 16,
            right: 30,
            left: 20,
            bottom: 16
          }}
        >
          <Tooltip />
          <XAxis dataKey='date' color='white' />
          <YAxis domain={['auto', 'auto']} color='white' />
          <Line type='monotone' dataKey='rwaste' stroke='#2bf586' width={4} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
