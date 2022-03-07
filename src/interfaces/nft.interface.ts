export interface Nft {
  tokenId: number
  image: string
  description: string
  name: string
  attributes: {
    trait_type: string
    value: string
  }[]
}
