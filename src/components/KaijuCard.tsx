import React, { FC } from 'react'
import { Nft } from '../interfaces/nft.interface'

export const KaijuCard: FC<Nft> = ({ image, tokenId }) => {
  return (
    <div>
      <img className='w-16 h-16' src={image} alt={`KaijuKingz ${tokenId}`} />
    </div>
  )
}
