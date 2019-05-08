import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const config = {
  itemSpacing: 10,
}

export const ChoiceGroupUI = styled('div')`
  ${baseStyles} &.is-align-horizontal {
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
