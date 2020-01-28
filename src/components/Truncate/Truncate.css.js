import styled from 'styled-components'
import { TRUNCATED_CLASSNAMES } from './Truncate.utils'

const truncateStyles = `
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TruncateUI = styled.span`
  box-sizing: border-box;
  will-change: contents;

  &.is-auto {
    ${truncateStyles};

    .c-Truncate__content {
      ${truncateStyles};
    }
  }
`
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
