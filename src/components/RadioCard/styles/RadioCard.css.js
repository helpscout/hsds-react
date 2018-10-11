// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import { cardStyles } from '../../../styles/mixins/cardStyles.css.js'
import styled from '../../styled/index.js'

export const config = {
  boxShadow: `
    0px 0px 0px 1px rgba(0, 0, 0, 0.05),
    0px 5px 10px 0px ${getColor('grey.300')},
    0px 3px 3px 0px rgba(0, 0, 0, 0.05)
  `,
  boxShadowHover: `
    0px 0px 0px 1px ${getColor('grey.500')},
    0px 5px 10px 1px ${getColor('grey.300')},
    0px 3px 3px 0px rgba(0, 0, 0, 0.05)
  `,
  borderRadius: '3px',
  iconColor: getColor('grey.600'),
  iconColorChecked: getColor('charcoal.500'),
  iconWrapperSize: 52,
  iconWrapperMargin: 5,
  padding: '5px 12px 15px',
  maxWidth: '75px',
  width: '100%',
  transition: 'box-shadow 200ms linear',
  willChange: 'box-shadow',
}

export const RadioCardUI = styled('label')`
  ${baseStyles} align-items: center;
  border-radius: ${config.borderRadius};
  box-shadow: ${config.boxShadow};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${config.maxWidth};
  min-width: 0;
  padding: ${config.padding};
  width: ${config.width};
  transition: ${config.transition};
  will-change: ${config.willChange};

  &:hover {
    box-shadow: ${config.boxShadowHover};
  }

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
