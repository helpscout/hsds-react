import styled from 'styled-components'
import { TRUNCATED_CLASSNAMES } from '../EditableField.utils'

export const TruncatedUI = styled('div')`
  display: flex;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

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
