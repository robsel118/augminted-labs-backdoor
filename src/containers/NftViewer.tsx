import React, { FC, useEffect, useState } from 'react'
import { useNFTBalances } from 'react-moralis'
import { KAIJU_KINGZ_ADDRESS, MUTANTS_ADDRESS } from 'src/config/constants'
import { useKaijuContract } from 'src/hooks/useKaijuContract'
import { useMutantContract } from 'src/hooks/useMutantContract'
import { Nft } from 'src/interfaces/nft.interface'
import { UseNFTBalancesParams } from 'react-moralis'

export const NftViewer: FC<{ wallet: string }> = ({ wallet }) => {
  const { data } = useNFTBalances({ chain: 'eth', address: wallet }, { autoFetch: true })
  const [kaijus, setKaijus] = useState<Nft[]>([])
  const [mutants, setMutants] = useState<Nft[]>([])

  return (
    <div>
      {JSON.stringify(kaijus)}
      {JSON.stringify(mutants)}
    </div>
  )
}
