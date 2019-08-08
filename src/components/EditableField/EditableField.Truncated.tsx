import * as React from 'react'

import { TruncatedUI } from './styles/EditableField.Truncated.css'
import Truncate from '../Truncate'

import { TRUNCATED_CLASSNAMES } from './EditableField.utils'
import { TruncateProps } from './EditableField.types'

const Truncated = ({ string, splitter }: TruncateProps) => {
  if (splitter) {
    const [first, second] = string.split(splitter)

    return (
      <TruncatedUI
        className={`${TRUNCATED_CLASSNAMES.component} ${
          TRUNCATED_CLASSNAMES.withSplitter
        }`}
      >
        <span className={`${TRUNCATED_CLASSNAMES.firstChunk}`}>{first}</span>
        <span className={`${TRUNCATED_CLASSNAMES.splitterChunk}`}>
          {splitter}
        </span>
        <span className={`${TRUNCATED_CLASSNAMES.secondChunk}`}>{second}</span>
      </TruncatedUI>
    )
  }

  return (
    <Truncate className={`${TRUNCATED_CLASSNAMES.component}`}>
      {string}
    </Truncate>
  )
}

export default Truncated
