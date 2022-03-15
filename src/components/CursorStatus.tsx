import React, { FC } from 'react'
import cn from 'classnames'

interface CursorStatus {
  visible: boolean
}
export const CursorStatus: FC<CursorStatus> = ({ visible }) => {
  return (
    <div
      className={cn('after:pl-1 after:absolute after:top-0 after:right-0 after:bottom-0 after:w-2 ', {
        'after:animate-[blink_1s_steps(2)_infinite]': visible
      })}
    ></div>
  )
}
