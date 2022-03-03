import { ethers } from 'ethers'
import { KAIJU_KINGZ_ADDRESS } from '../config/constants'
import { Kaijus__factory } from '../contracts'
export const useKaijuContract = () => {
  const KaijuContract = Kaijus__factory.connect(KAIJU_KINGZ_ADDRESS, ethers.getDefaultProvider())
  return { KaijuContract }
}
