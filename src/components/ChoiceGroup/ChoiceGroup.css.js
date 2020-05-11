import styled from 'styled-components'

export const config = {
  itemSpacing: 10,
}

export const ChoiceGroupUI = styled('div')`
  &.is-align-horizontal {
    display: flex;

    > * {
      margin-right: ${config.itemSpacing}px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`

export default ChoiceGroupUI
