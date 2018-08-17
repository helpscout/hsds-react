// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { cardStyles } from '../../../styles/mixins/cardStyles.css.js'
import styled from '../../styled/index.js'

export const config = {
  padding: 15,
  width: 75,
}

export const RadioCardUI = styled('div')`
  ${baseStyles}
  ${cardStyles()}
  padding: ${config.padding}px;
  width: ${config.width}px;
`

export default RadioCardUI
