import React, { FC } from 'react'
interface NftCardProps {
  nftName: string
  quantity: number
}

export const NftCard: FC<NftCardProps> = ({ nftName, quantity }) => {
  return (
    <div className='bg-panel p-4 rounded-sm border-l-4 border-green-corrosive flex flex-col gap-2'>
      <p className='font-semibold'>You own </p>
      <p className='text-xl font-extrabold text-green-corrosive'>{quantity}</p>
      <p className='font-semibold text-white'>{nftName}</p>
    </div>
  )
}
