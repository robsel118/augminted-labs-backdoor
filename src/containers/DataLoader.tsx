import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useNFTBalances } from 'react-moralis'
import { CursorStatus } from 'src/components/CursorStatus'
import { KAIJU_KINGZ_ADDRESS, MUTANTS_ADDRESS } from 'src/config/constants'
import { useKaijuContract } from 'src/hooks/useKaijuContract'
import { useMutantContract } from 'src/hooks/useMutantContract'
import { useRwasteContract } from 'src/hooks/useRwasteContract'
import { Nft } from 'src/interfaces/nft.interface'
import { RwasteBalance } from 'src/interfaces/RwasteBalance.interface'
import Typewriter from 'typewriter-effect'
interface DataLoaderProps {
  setRwaste: Dispatch<SetStateAction<RwasteBalance>>
  setKaijus: Dispatch<SetStateAction<Nft[]>>
  setMutants: Dispatch<SetStateAction<Nft[]>>
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

const wallet = '0x36A16809AED6AE0fa2d6854EE06ad158D5884ec9'
export const DataLoader: FC<DataLoaderProps> = ({ setRwaste, setKaijus, setMutants }) => {
  const [progress, setProgress] = useState<number>(0)
  const [nfts, setNfts] = useState<MoralisResponse[]>([])
  const { getRwasteBalance, getRwasteToClaim } = useRwasteContract()
  const { getNFTBalances } = useNFTBalances({ chain: 'eth', address: wallet }, { autoFetch: false })

  const { getKaijuBalanceMetadata } = useKaijuContract()
  const { getMutantBalanceMetadata } = useMutantContract()
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
                  getNFTBalances().then((response) => {
                    setNfts(response?.result || [])
                    setProgress(5)
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
                  Promise.all([getRwasteBalance(wallet), getRwasteToClaim(wallet)]).then((response) => {
                    setRwaste({ held: response[0], toClaim: response[1] })
                    typed.elements.container.innerHTML += successStatus
                    setProgress((step) => step + 1)
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
                  getKaijuBalanceMetadata(
                    nfts
                      .filter((nft) => nft.token_address === KAIJU_KINGZ_ADDRESS)
                      .map((nft) => nft.token_id)
                  ).then((response) => {
                    setKaijus(response.map((nft) => nft.data))
                    typed.elements.container.innerHTML += successStatus
                    setProgress((step) => step + 1)
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
                  ).then((response) => {
                    setMutants(response.map((nft) => nft.data))
                    typed.elements.container.innerHTML += successStatus
                    setProgress((step) => step + 1)
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
                .typeString('Accessing RSCALES project data')
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
                .typeString('Accessing scientist profiles data')
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
              typewriter.typeString('Generating report...').pauseFor(200).start()
            }}
          />
          <CursorStatus visible />
        </div>
      )}
    </div>
  )
}
