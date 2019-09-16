import styled from '../../styled'
import { TRUNCATED_CLASSNAMES } from '../Truncate.utils'

export const TruncateWithSplitterUI = styled('div')`
  display: flex;
  width: 100%;
  max-width: 100%;

  .${TRUNCATED_CLASSNAMES.firstChunk} {
    flex-shrink: 2;
    min-width: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
