import styled from 'styled-components'

import { getColor } from '../../styles/utilities/color'
import Heading from '../Heading'
import Text from '../Text'

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
  borderRadius: 4,
  focusOutlineWidth: '2px',
  focusOutlineColor: getColor('blue.500'),
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

interface RadioCardUIProp {
  maxWidth: any
}

export const RadioCardUI = styled('label')<RadioCardUIProp>`
  align-items: center;
  border-radius: ${config.borderRadius}px;
  box-shadow: ${config.boxShadow};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : config.maxWidth)};
  min-width: 0;
  padding: ${config.padding};
  position: relative;
  width: ${config.width};
  transition: ${config.transition};
  will-change: ${config.willChange};

  &:hover {
    box-shadow: ${config.boxShadowHover};
  }

  &.is-checked {
    box-shadow: ${config.boxShadowHover};
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

export const FocusUI = styled('div')`
  animation: BackdropFocusFadeIn 200ms;
  border-radius: ${config.borderRadius + 2}px;
  bottom: -3px;
  box-shadow: 0 0 0 ${config.focusOutlineWidth} ${config.focusOutlineColor};
  left: -3px;
  pointer-events: none;
  position: absolute;
  right: -3px;
  top: -3px;
  z-index: 1;

  @keyframes BackdropFocusFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const HeadingUI = styled(Heading)`
  font-size: 13px;
  margin-bottom: 0;
  color: ${getColor('charcoal.700')};
  text-align: center;
`

export const ContentUI = styled(Text)`
  font-size: 13px;
  margin-bottom: 25px;
  color: ${getColor('charcoal.200')};
  text-align: center;
`

export default RadioCardUI
