import * as React from 'react'
import { TruncateUI } from './styles/EditableField.Truncate.css'

import Truncate from '../Truncate'
import {
  EF_TRUNC_COMPONENT_KEY,
  getComponentClassNames,
} from './EditableField.utils'
import { TruncateProps } from './EditableField.types'

export const CLASSNAMES: any = getComponentClassNames(EF_TRUNC_COMPONENT_KEY)

const Truncated = ({ string, splitter }: TruncateProps) => {
  if (splitter) {
    const [first, second] = string.split(splitter)

    return (
      <TruncateUI className={`${CLASSNAMES.withSplitter}`}>
        <span className={`${CLASSNAMES.firstChunk}`}>{first}</span>
        <span className={`${CLASSNAMES.splitterChunk}`}>{splitter}</span>
        <span className={`${CLASSNAMES.secondChunk}`}>{second}</span>
      </TruncateUI>
    )
  }

  return <Truncate className={`${CLASSNAMES.truncated}`}>{string}</Truncate>
}

export default Truncated
