import React, { FC } from 'react'
import cn from 'classnames'

// sadly tailwind doesn't compile template literals, so we use typescript's 4.1
// to create proper typings for the values we need
type textLength = '32' | '33' | '28'
type before = `before:animate-[typewriter_1s_steps(${textLength})_forwards]`
type after = `after:animate-[typewriter_1s_steps(${textLength})_forwards,blink_1s_steps(2)_infinite]`

const animations: Record<textLength, (after | before)[]> = {
  '28': [
    'after:animate-[typewriter_1s_steps(28)_forwards,blink_1s_steps(2)_infinite]',
    'before:animate-[typewriter_1s_steps(28)_forwards]'
  ],
  '32': [
    'after:animate-[typewriter_1s_steps(32)_forwards,blink_1s_steps(2)_infinite]',
    'before:animate-[typewriter_1s_steps(32)_forwards]'
  ],
  '33': [
    'after:animate-[typewriter_1s_steps(33)_forwards,blink_1s_steps(2)_infinite]',
    'before:animate-[typewriter_1s_steps(33)_forwards]'
  ]
}

interface TypeWriterProps {
  text: string
}

export const TypeWriter: FC<TypeWriterProps> = ({ text }) => {
  if (!(text.length.toString() in animations)) {
    console.error('text length not supported, the animation would look off if the length is not supported')
    return <></>
  }
  return (
    <span
      className={cn(
        `font-mono relative w-max block`,
        'before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-panel-opaque',
        `after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-green-corrosive after:w-2 opacity-100`,
        ...animations[text.length.toString() as textLength]
      )}
    >
      {text}
    </span>
  )
}
