// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import {
  cardStyles,
  cardSubtleStyles,
} from '../../../styles/mixins/cardStyles.css.js'
import styled from '../../styled/index.js'

export const config = {
  iconColor: getColor('grey.600'),
  iconColorChecked: getColor('charcoal.500'),
  iconWrapperSize: 52,
  iconWrapperMargin: 5,
  padding: '5px 12px 15px',
  width: 75,
}

export const RadioCardUI = styled('label')`
  ${baseStyles} ${cardSubtleStyles()}
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: ${config.padding};
  width: ${config.width}px;

  &.is-checked {
    ${cardStyles()};
  }
`

export const IconWrapperUI = styled('div')`
  align-items: center;
  color: ${config.iconColor};
  display: flex;
  height: ${config.iconWrapperSize}px;
  justify-content: center;
  margin-bottom: ${config.iconWrapperMargin}px;
  width: ${config.iconWrapperSize}px;

  &.is-checked {
    color: ${config.iconColorChecked};
  }
`

export default RadioCardUI
