import * as React from 'react'
import { TruncateUI } from './styles/EditableField.Truncate.css'

import Truncate from '../Truncate'
import { TruncateProps } from './EditableField.types'

const Truncated = ({ string, splitter }: TruncateProps) => {
  if (splitter) {
    const [first, second] = string.split(splitter)

    return (
      <TruncateUI className="TruncatedWithSplitter">
        <span className="TruncateFirstChunk">{first}</span>
        <span className="TruncateSplitterChunk">{splitter}</span>
        <span className="TruncateSecondChunk">{second}</span>
      </TruncateUI>
    )
  }

  return <Truncate className="Truncated">{string}</Truncate>
}

export default Truncated
