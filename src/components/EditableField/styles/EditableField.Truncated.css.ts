import styled from '../../styled/index'

export const TruncatedUI = styled('div')`
  display: flex;
  width: 100%;
  max-width: 100%;

  .TruncateFirstChunk {
    flex-shrink: 2;
    min-width: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
