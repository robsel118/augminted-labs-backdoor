import { ethers } from 'ethers'
import { KAIJU_KINGZ_ADDRESS } from '../config/constants'
import { Kaijus__factory } from '../contracts'
import axios, { AxiosResponse } from 'axios'
import { Nft } from '../interfaces/nft.interface'

export const useKaijuContract = () => {
  const KaijuContract = Kaijus__factory.connect(
    KAIJU_KINGZ_ADDRESS,
    ethers.getDefaultProvider('homestead', { etherscan: process.env.REACT_APP_ETHERSCAN_KEY })
  )

  const getTokenUri = (tokenId: string) => {
    return KaijuContract.tokenURI(parseInt(tokenId))
  }

  const getKaijuBalanceMetadata = async (tokenIds: string[]): Promise<AxiosResponse<Nft>[]> => {
    return Promise.all(tokenIds.map((mutantId) => getTokenUri(mutantId))).then((mutantTokenUris) =>
      Promise.all(mutantTokenUris.map((tokenUri) => axios.get(tokenUri)))
    )
  }

  const getGenesisCount = (wallet: string) => {
    return KaijuContract.balanceGenesis(wallet)
  }

  return { KaijuContract, getKaijuBalanceMetadata, getGenesisCount }
}
