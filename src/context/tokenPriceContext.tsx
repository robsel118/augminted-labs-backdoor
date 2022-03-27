import { createContext } from 'react'
import { ContextProp } from 'src/context/context-props'

export interface TokenPrices {
  rwasteToken: ContextProp<TokenResponse>
}
export interface TokenResponse {
  nativePrice?:
    | {
        value: string
        decimals: number
        name: string
        symbol: string
      }
    | undefined
  usdPrice: number
  exchangeAddress?: string | undefined
  exchangeName?: string | undefined
}

export const TokenPriceContext = createContext<TokenPrices>({} as TokenPrices)
