import { ethers } from 'ethers'
import { MUTANTS_ADDRESS } from '../config/constants'
import { Mutants__factory } from '../contracts'

export const useMutantContract = () => {
  const MutantContract = Mutants__factory.connect(MUTANTS_ADDRESS, ethers.getDefaultProvider())
  return { MutantContract }
}
