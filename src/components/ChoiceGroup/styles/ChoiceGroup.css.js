// @flow
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
    }
  }
`

export default ChoiceGroupUI
