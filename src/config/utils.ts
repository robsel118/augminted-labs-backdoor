import { DECIMALS } from './constants'

export const hexToDisplay = (hex: string) => {
  return parseInt(hex, 16) / Math.pow(10, DECIMALS)
}
