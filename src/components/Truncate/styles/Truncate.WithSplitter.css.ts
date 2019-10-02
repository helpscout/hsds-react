import styled from '../../styled'
import { TRUNCATED_CLASSNAMES } from '../Truncate.utils'

export const TruncateWithSplitterUI = styled('div')`
  display: flex;
  width: 100%;
  max-width: 100%;

  .${TRUNCATED_CLASSNAMES.firstChunk} {
    flex-shrink: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .${TRUNCATED_CLASSNAMES.secondChunk} {
    max-width: 90%;
    flex-shrink: 0;
  }
`
