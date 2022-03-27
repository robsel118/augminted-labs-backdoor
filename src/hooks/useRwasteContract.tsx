import { ethers } from 'ethers'
import { hexToDisplay } from 'src/config/utils'
import { RWASTE_ADDRESS } from '../config/constants'
import { Rwaste__factory } from '../contracts'
export const useRwasteContract = () => {
  const RwasteContract = Rwaste__factory.connect(
    RWASTE_ADDRESS,
    ethers.getDefaultProvider('homestead', { etherscan: process.env.REACT_APP_ETHERSCAN_KEY })
  )

  const getRwasteBalance = async (address: string) => {
    const balance = await RwasteContract.balanceOf(address)
    return hexToDisplay(balance._hex)
  }
  const getRwasteToClaim = async (address: string) => {
    const balance = await RwasteContract.getTotalClaimable(address)
    return hexToDisplay(balance._hex)
  }
  return { RwasteContract, getRwasteBalance, getRwasteToClaim }
}
