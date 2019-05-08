import styled from '../../styled'
import Block from '../Skeleton.Block'

export const TextUI = styled(Block)`
  border-radius: 9999px;
  height: 9px;
  margin-bottom: 11px;
  width: 100%;

  &.is-heading {
    height: 16px;

    &.is-sm {
      height: 9px;
      margin-bottom: 15px;
    }
  }
`
