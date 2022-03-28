import React, { FC, useContext } from 'react'
import { RwasteBalance } from 'src/interfaces/rwasteBalance.interface'
import {
  faCalendarDay,
  faWallet,
  faHandHoldingDroplet,
  faRadiation,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { TokenPriceContext } from 'src/context/tokenPriceContext'
import { ethers } from 'ethers'

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
      <div className='bg-color rounded-full p-3 w-10 h-10 flex justify-center items-center'>
        <Icon icon={icon} size='lg' color='black' />
      </div>
      <div className='flex flex-col'>
        <p className='font-bold text-green-corrosive text-lg pb-1'>{value.toFixed(decimal)}</p>
        <span className='text-sm font-semibold'>{description}</span>
      </div>
    </div>
  )
}

export const RwastePanel: FC<RwastePanelProps> = ({ genesisCount, rwaste }) => {
  const { rwasteToken } = useContext(TokenPriceContext)
  const tokenPriceInEthers = parseFloat(ethers.utils.formatEther(rwasteToken.value!.nativePrice!.value))
  return (
    <div className='bg-panel flex flex-col gap-4 px-8 py-6 rounded-sm w-max border-l-4 border-green-corrosive order-1 xl:order-2'>
      <p className='text-xl font-bold text-white'>OVERVIEW</p>
      <Panel
        icon={faDollarSign}
        value={rwasteToken.value!.usdPrice}
        description='$ per $RWASTE'
        decimal={2}
      />
      <Panel
        icon={faEthereum as IconDefinition}
        value={tokenPriceInEthers}
        description='ETH per $RWASTE'
        decimal={6}
      />
      <Panel icon={faCalendarDay} value={genesisCount * 5} description='Generated Daily' />
      <Panel icon={faWallet} value={rwaste.held} description='In Wallet' decimal={2} />
      <Panel icon={faHandHoldingDroplet} value={rwaste.toClaim} description='To Claim' />
      <Panel
        icon={faRadiation}
        value={Math.max(
          parseInt(((750 - (rwaste.toClaim + rwaste.held)) / (5 * genesisCount)).toFixed(2), 10),
          0
        )}
        description='Days to fuse a baby'
        decimal={2}
      />
    </div>
  )
}
