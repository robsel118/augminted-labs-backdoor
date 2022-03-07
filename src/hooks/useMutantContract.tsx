import { ethers } from 'ethers'
import { MUTANTS_ADDRESS } from '../config/constants'
import { Mutants__factory } from '../contracts'
import axios, { AxiosResponse } from 'axios'
import { Nft } from '../interfaces/nft.interface'

export const useMutantContract = () => {
  const MutantContract = Mutants__factory.connect(
    MUTANTS_ADDRESS,
    ethers.getDefaultProvider('homestead', { etherscan: process.env.REACT_APP_ETHERSCAN_KEY })
  )

  const getTokenUri = (tokenId: string) => {
    return MutantContract.tokenURI(parseInt(tokenId))
  }

  const getMutantBalanceMetadata = (tokenIds: string[]): Promise<AxiosResponse<Nft>[]> => {
    return Promise.all(tokenIds.map((mutantId) => getTokenUri(mutantId))).then((mutantTokenUris) =>
      Promise.all(mutantTokenUris.map((tokenUri) => axios.get(tokenUri)))
    )
  }
  return { MutantContract, getMutantBalanceMetadata }
}
