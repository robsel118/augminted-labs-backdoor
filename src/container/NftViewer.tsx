import React, { FC, useEffect, useState } from 'react'
import { useNFTBalances } from 'react-moralis'
import { KAIJU_KINGZ_ADDRESS, MUTANTS_ADDRESS } from '../config/constants'
import { useKaijuContract } from '../hooks/useKaijuContract'
import { useMutantContract } from '../hooks/useMutantContract'
import { Nft } from '../interfaces/nft.interface'

export const NftViewer: FC<{ wallet: string }> = ({ wallet }) => {
  const { data } = useNFTBalances({ chain: 'eth', address: wallet }, { autoFetch: true })
  const { getKaijuBalanceMetadata } = useKaijuContract()
  const { getMutantBalanceMetadata } = useMutantContract()
  const [kaijus, setKaijus] = useState<Nft[]>([])
  const [mutants, setMutants] = useState<Nft[]>([])

  useEffect(() => {
    if (data?.result) {
      console.log(data)
      const kaijuIds = data.result
        .filter((nft) => nft.token_address === KAIJU_KINGZ_ADDRESS)
        .map((nft) => nft.token_id)
      const mutantIds = data.result
        .filter((nft) => nft.token_address === MUTANTS_ADDRESS)
        .map((nft) => nft.token_id)
      console.log(kaijuIds)

      getKaijuBalanceMetadata(kaijuIds).then((res) => {
        setKaijus(res.map((kaiju) => kaiju.data))
      })

      getMutantBalanceMetadata(mutantIds).then((res) => {
        setMutants(res.map((mutant) => mutant.data))
      })
    }
  }, [data?.result])

  return (
    <div>
      {JSON.stringify(kaijus)}
      {JSON.stringify(mutants)}
    </div>
  )
}
