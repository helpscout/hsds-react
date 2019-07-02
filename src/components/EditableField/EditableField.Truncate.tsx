import * as React from 'react'
import { TruncateUI } from './styles/EditableField.Truncate.css'

import Truncate from '../Truncate'

const Truncated = ({ string, splitter }) => {
  if (splitter) {
    const [first, second] = string.split(splitter)

    return (
      <TruncateUI className="TruncatedWithSplitter">
        <span className="TruncateFirstChunk">{first}</span>
        <span className="TruncateAtChunk">{splitter}</span>
        <span className="TruncateSecondChunk">{second}</span>
      </TruncateUI>
    )
  }

  return <Truncate>{string}</Truncate>
}

export default Truncated
