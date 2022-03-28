import React, { FC, useContext } from 'react'
import { BalanceCard } from 'src/components/BalanceCard'
import { NftCard } from 'src/components/NftCard'
import { Token } from 'src/config/constants'
import { TokenPriceContext } from 'src/context/tokenPriceContext'
import { RwasteBalance } from 'src/interfaces/rwasteBalance.interface'
import { faWallet, faDroplet, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { DexGraph } from 'src/components/DexGraph'
interface RwasteInsightProps {
  rwaste: RwasteBalance
  genesisCount: number
  kaijuCount: number
  mutantCount: number
  babyCount: number
}

export const RWasteInsight: FC<RwasteInsightProps> = ({
  rwaste,
  genesisCount,
  kaijuCount,
  mutantCount,
  babyCount
}) => {
  const { rwasteToken } = useContext(TokenPriceContext)
  return (
    <div className='order-2 xl:order-1'>
      <h2 className='text-4xl text-white font-extrabold mb-16'>
        You can claim a total of {rwaste.toClaim.toFixed(0)} $RWASTE
      </h2>
      <h3 className='text-2xl text-white font-bold mb-8'>
        <Icon icon={faWallet} /> Wallet insight
      </h3>
      <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8 mb-8'>
        <BalanceCard
          title='Token Held'
          quantity={rwaste.held}
          token={Token.RWASTE}
          tokenPrice={rwasteToken.value!}
        />
        <BalanceCard
          title='Token to claim'
          quantity={rwaste.toClaim}
          token={Token.RWASTE}
          tokenPrice={rwasteToken.value!}
        />
        <BalanceCard
          title='Total token'
          quantity={rwaste.toClaim + rwaste.held}
          token={Token.RWASTE}
          tokenPrice={rwasteToken.value!}
        />
        <NftCard nftName='Genesis' quantity={genesisCount} />
        <NftCard nftName='Babies' quantity={kaijuCount - genesisCount} />
        <NftCard nftName='Mutants' quantity={mutantCount} />
      </div>
      <h3 className='text-2xl text-white font-bold mb-8'>
        <Icon icon={faDroplet} /> Token yield
      </h3>
      <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8 mb-8'>
        <BalanceCard
          title='Daily'
          quantity={genesisCount * 5}
          token={Token.RWASTE}
          tokenPrice={rwasteToken.value!}
        />
        <BalanceCard
          title='Weekly'
          quantity={genesisCount * 5 * 7}
          token={Token.RWASTE}
          tokenPrice={rwasteToken.value!}
        />
        <BalanceCard
          title='Monthly'
          quantity={genesisCount * 5 * 30}
          token={Token.RWASTE}
          tokenPrice={rwasteToken.value!}
        />
      </div>
      <h3 className='text-2xl text-white font-bold mb-8'>
        <Icon icon={faInfoCircle} /> General info
      </h3>
      <div className='xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8 mb-8'>
        <NftCard leading='There are still' nftName='Babies to mint' quantity={6666 - babyCount} />
      </div>
      <DexGraph />
    </div>
  )
}
