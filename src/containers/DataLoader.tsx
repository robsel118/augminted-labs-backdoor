import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import { useNFTBalances, useTokenPrice } from 'react-moralis'
import { useParams, useNavigate } from 'react-router-dom'
import { CursorStatus } from 'src/components/CursorStatus'
import { KAIJU_KINGZ_ADDRESS, MUTANTS_ADDRESS, Token, TokenAddress } from 'src/config/constants'
import { RouteNames } from 'src/config/routes'
import { TokenPriceContext } from 'src/context/tokenPriceContext'
import { useKaijuContract } from 'src/hooks/useKaijuContract'
import { useMutantContract } from 'src/hooks/useMutantContract'
import { useRwasteContract } from 'src/hooks/useRwasteContract'
import { Nft } from 'src/interfaces/nft.interface'
import { RwasteBalance } from 'src/interfaces/rwasteBalance.interface'
import Typewriter from 'typewriter-effect'
interface DataLoaderProps {
  setRwaste: Dispatch<SetStateAction<RwasteBalance>>
  setKaijus: Dispatch<SetStateAction<Nft[]>>
  setMutants: Dispatch<SetStateAction<Nft[]>>
  setGenesisCount: Dispatch<SetStateAction<number>>
  setDataLoaded: Dispatch<SetStateAction<boolean>>
  setBabyCount: Dispatch<SetStateAction<number>>
}

const typewriterOption = {
  cursor: '',
  delay: 20
}

const successStatus = '<span class="text-green-corrosive font-semibold"> [GRANTED]</span>'
const failedStatus = '<span class="text-redioactive font-semibold"> [DENIED]</span>'
export interface MoralisResponse {
  token_address: string
  token_id: string
  contract_type: string
  owner_of: string
  block_number: string
  block_number_minted: string
  token_uri?: string | undefined
  metadata?: string | undefined
  synced_at?: string | undefined
  amount?: string | undefined
  name: string
  symbol: string
}

export const DataLoader: FC<DataLoaderProps> = ({
  setRwaste,
  setKaijus,
  setMutants,
  setDataLoaded,
  setGenesisCount,
  setBabyCount
}) => {
  // page state
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [nfts, setNfts] = useState<MoralisResponse[]>([])

  // context
  const { rwasteToken } = useContext(TokenPriceContext)

  // react router
  const { wallet } = useParams()
  const navigate = useNavigate()

  const { getRwasteBalance, getRwasteToClaim } = useRwasteContract()
  const { getNFTBalances } = useNFTBalances(
    { address: wallet, token_addresses: [KAIJU_KINGZ_ADDRESS, MUTANTS_ADDRESS], chain: 'eth' },
    { autoFetch: false }
  )
  const { getKaijuBalanceMetadata, getGenesisCount, getBabyCount } = useKaijuContract()
  const { getMutantBalanceMetadata } = useMutantContract()
  const { fetchTokenPrice } = useTokenPrice({
    address: TokenAddress[Token.RWASTE],
    chain: 'eth'
  })

  if (wallet === undefined) {
    navigate(RouteNames.HOME)
  }
  if (error) {
    return (
      <div className='bg-panel p-4 text-redioactive'>
        Something went wrong... Maybe someone spilled RWASTE on the server...{' '}
      </div>
    )
  }

  return (
    <div className='bg-panel-opaque p-8'>
      {progress >= 0 && (
        <div className='relative w-max flex flex-row gap-2 mb-2'>
          <Typewriter
            options={typewriterOption}
            onInit={(typewriter) => {
              typewriter
                .typeString('---WAITING FOR SOCKET CONNECTION---')
                .callFunction(() => {
                  Promise.all([fetchTokenPrice(), getNFTBalances()])
                    .then(([rwastePrice, nftBalance]) => {
                      setNfts(nftBalance?.result || [])
                      rwasteToken.setValue(rwastePrice!)
                      setProgress(5)
                    })
                    .catch(() => {
                      setError(true)
                    })
                })
                .start()
            }}
          />
          <CursorStatus visible={progress === 0} />
        </div>
      )}
      {progress >= 1 && (
        <div className='relative w-max flex flex-row gap-2 mb-2'>
          <Typewriter
            options={typewriterOption}
            onInit={(typewriter) => {
              typewriter
                .typeString('Accessing RWASTE project data')
                .callFunction((typed) => {
                  Promise.all([getRwasteBalance(wallet!), getRwasteToClaim(wallet!)])
                    .then((response) => {
                      setRwaste({ held: response[0], toClaim: response[1] })
                      typed.elements.container.innerHTML += successStatus
                      setProgress((step) => step + 1)
                    })
                    .catch(() => {
                      setError(true)
                    })
                })
                .start()
            }}
          />

          <CursorStatus visible={progress < 8} />
        </div>
      )}
      {progress >= 2 && (
        <div className='relative w-max flex flex-row gap-2 mb-2'>
          <Typewriter
            options={typewriterOption}
            onInit={(typewriter) => {
              typewriter
                .typeString('Accessing Genesis project data')
                .callFunction((typed) => {
                  Promise.all([
                    getKaijuBalanceMetadata(
                      nfts
                        .filter((nft) => nft.token_address === KAIJU_KINGZ_ADDRESS)
                        .map((nft) => nft.token_id)
                    ),
                    getGenesisCount(wallet!),
                    getBabyCount()
                  ])
                    .then(([response, count, babyCount]) => {
                      typed.elements.container.innerHTML += successStatus
                      setGenesisCount(parseInt(count._hex, 16))
                      setKaijus(response.map((nft) => nft.data))
                      setBabyCount(parseInt(babyCount._hex, 16))
                      setProgress((step) => step + 1)
                    })
                    .catch(() => {
                      setError(true)
                    })
                })
                .start()
            }}
          />
          <CursorStatus visible={progress < 8} />
        </div>
      )}
      {progress >= 3 && (
        <div className='relative w-max flex flex-row gap-2 mb-2'>
          <Typewriter
            options={typewriterOption}
            onInit={(typewriter) => {
              typewriter
                .typeString('Accessing Mutant project data')
                .callFunction((typed) => {
                  getMutantBalanceMetadata(
                    nfts.filter((nft) => nft.token_address === MUTANTS_ADDRESS).map((nft) => nft.token_id)
                  )
                    .then((response) => {
                      setMutants(response.map((nft) => nft.data))
                      typed.elements.container.innerHTML += successStatus
                      setProgress((step) => step + 1)
                    })
                    .catch(() => {
                      setError(true)
                    })
                })
                .start()
            }}
          />
          <CursorStatus visible={progress < 8} />
        </div>
      )}
      {progress >= 4 && (
        <div className='relative w-max flex flex-row gap-2 mb-2'>
          <Typewriter
            options={typewriterOption}
            onInit={(typewriter) => {
              typewriter
                .typeString('Accessing RSCALE project data')
                .pauseFor(300)
                .typeString(failedStatus)
                .callFunction(() => {
                  setProgress((step) => step + 1)
                })
                .start()
            }}
          />
          <CursorStatus visible={progress < 8} />
        </div>
      )}
      {progress >= 5 && (
        <div className='relative w-max flex flex-row gap-2 mb-2'>
          <Typewriter
            options={typewriterOption}
            onInit={(typewriter) => {
              typewriter
                .typeString('Accessing Scientist profiles data')
                .pauseFor(300)
                .typeString(failedStatus)
                .start()
            }}
          />
          <CursorStatus visible={progress < 8} />
        </div>
      )}
      {progress >= 8 && (
        <div className='relative w-max flex flex-row gap-2 mb-2'>
          <Typewriter
            options={typewriterOption}
            onInit={(typewriter) => {
              typewriter
                .typeString('Generating report...')
                .pauseFor(200)
                .callFunction(() => setDataLoaded(true))
                .start()
            }}
          />
          <CursorStatus visible />
        </div>
      )}
    </div>
  )
}
