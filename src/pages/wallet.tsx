import React, { useState } from 'react'
import { DataLoader } from 'src/containers/DataLoader'
import { Nft } from 'src/interfaces/nft.interface'
import { RwasteBalance } from 'src/interfaces/RwasteBalance.interface'

export const WalletPage = () => {
  const [kaijus, setKaijus] = useState<Nft[]>([])
  const [mutants, setMutants] = useState<Nft[]>([])
  const [rwaste, setRwaste] = useState<RwasteBalance>({ held: 0, toClaim: 0 })
  return <DataLoader setKaijus={setKaijus} setMutants={setMutants} setRwaste={setRwaste} />
}
