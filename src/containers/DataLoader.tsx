import React, { useState } from 'react'
import { TypeWriter } from 'src/components/TypeWriter'
import { Nft } from 'src/interfaces/nft.interface'
import { RwasteBalance } from 'src/interfaces/RwasteBalance.interface'
interface DataLoaderProps {
  setRwaste: (balance: RwasteBalance) => void
  setKaijus: (kaijus: Nft) => void
  setMutants: (mutants: Nft) => void
}
export const DataLoader = () => {
  const [progress, setProgress] = useState<number>(4)
  return (
    <div className='bg-panel-opaque'>
      {progress >= 0 && <TypeWriter text='Downloading Rwaste project files' />}
      {progress >= 1 && <TypeWriter text='Downloading Genesis project files' />}
      {progress >= 2 && <TypeWriter text='Downloading Mutant project files' />}
      {progress >= 3 && <TypeWriter text='Downloading Scales project files' />}
      {progress >= 4 && <TypeWriter text='Downloading Scientists files' />}
    </div>
  )
}
