import React, { FC } from 'react'
import { RwasteBalance } from 'src/interfaces/rwasteBalance.interface'
import {
  faCalendarDay,
  faWallet,
  faHandHoldingDroplet,
  faRadiation
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface RwastePanelProps {
  rwaste: RwasteBalance
  genesisCount: number
}

interface PanelProps {
  icon: IconDefinition
  value: number
  description: string
  decimal?: number
}

const Panel: FC<PanelProps> = ({ icon, value, description, decimal = 0 }) => {
  return (
    <div className='flex flex-row items-center gap-4'>
      <Icon className='bg-color rounded-full p-3' icon={icon} color='black' />
      <div className='flex flex-col'>
        <p className='font-bold text-lg pb-1'>{value.toFixed(decimal)}</p>
        <span className='text-sm'>{description}</span>
      </div>
    </div>
  )
}

export const RwastePanel: FC<RwastePanelProps> = ({ genesisCount, rwaste }) => {
  return (
    <div className='bg-panel flex flex-col gap-4 px-8 py-6 rounded-sm w-max'>
      <p className='text-xl font-bold'>RWASTE</p>
      <Panel icon={faCalendarDay} value={genesisCount * 5} description='Generated Daily' />
      <Panel icon={faWallet} value={rwaste.held} description='In Wallet' decimal={2} />
      <Panel icon={faHandHoldingDroplet} value={rwaste.toClaim} description='To Claim' />
      <Panel
        icon={faRadiation}
        value={parseInt(((750 - (rwaste.toClaim + rwaste.held)) / (5 * genesisCount)).toFixed(2), 10)}
        description='Days to fuse a baby'
        decimal={2}
      />
    </div>
  )
}
