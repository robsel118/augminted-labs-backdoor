import React, { useState } from 'react'
import { RwastePanel } from 'src/components/RwastePanel'
import { DataLoader } from 'src/containers/DataLoader'
import { Nft } from 'src/interfaces/nft.interface'
import { RwasteBalance } from 'src/interfaces/rwasteBalance.interface'

export const WalletPage = () => {
  const [kaijus, setKaijus] = useState<Nft[]>([])
  const [mutants, setMutants] = useState<Nft[]>([])
  const [rwaste, setRwaste] = useState<RwasteBalance>({ held: 0, toClaim: 0 })
  const [isDataLoaded, setDataLoaded] = useState<boolean>(false)
  const [genesisCount, setGenesisCount] = useState<number>(0)

  if (!isDataLoaded) {
    return (
      <DataLoader
        setKaijus={setKaijus}
        setMutants={setMutants}
        setRwaste={setRwaste}
        setDataLoaded={setDataLoaded}
        setGenesisCount={setGenesisCount}
      />
    )
  }

  return (
    <div>
      <RwastePanel rwaste={rwaste} genesisCount={genesisCount} />
    </div>
  )
}
