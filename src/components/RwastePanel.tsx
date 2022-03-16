import React, { FC } from 'react'
import { RwasteBalance } from 'src/interfaces/RwasteBalance.interface'

interface RwastePanelProps {
  rwaste: RwasteBalance
  genesisCount: number
}

export const RwastePanel: FC<RwastePanelProps> = ({ genesisCount, rwaste }) => {
  return (
    <div className='bg-panel flex flex-col'>
      <div>
        <p>{genesisCount * 5}</p>
        <span>Generated Daily</span>
      </div>
      <div>
        <p>{rwaste.held}</p>
        <span>In Wallet</span>
      </div>
      <div>
        <p>{rwaste.toClaim}</p>
        <span>To Claim</span>
      </div>
      <div>
        <p>{((750 - (rwaste.toClaim + rwaste.held)) / (5 * genesisCount)).toFixed(2)}</p>
        <span>Days to fuse a baby</span>
      </div>
    </div>
  )
}
