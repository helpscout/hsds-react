import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'
import { d500 } from '@hsds/utils-mixins'
import { ArrowUI, TooltipUI } from '../Tooltip/Tooltip.css'
import Heading from '../Heading'

export const config = {
  borderColor: getColor('grey.600'),
  padding: '15px',
  background: 'white',
}

/** Make the border color slightly darker than the popover's
 * border to account for aliasing that makes the arrow color appear
 * lighter
 */
export const ArrowPopoverUI = styled(ArrowUI)`
  &:before {
    background: ${config.background};
    border: 1px solid #acb7c0;
  }

  /* ghost */
  &:after {
    content: '';
    background: ${config.background};
    position: absolute;
    transform: rotate(45deg);
    height: calc(${({ arrowSize }) => arrowSize}px - 4px);
    width: calc(${({ arrowSize }) => arrowSize}px - 4px);
    margin: 2px;
    border-color: transparent;
    box-shadow: none;
    left: 0;
  }
`
export const PopoverUI = styled(TooltipUI)`
  ${d500}
  color: inherit;
  font-size: inherit;
  padding: ${config.padding};

  &[data-placement^='top'] ${ArrowPopoverUI} {
    &:before {
      bottom: -2px;
    }
    &:after {
      bottom: -1px;
    }
  }

  &[data-placement^='bottom'] ${ArrowPopoverUI} {
    &:before {
      top: -2px;
    }
    &:after {
      top: -1px;
    }
  }

  &[data-placement^='left'] ${ArrowPopoverUI} {
    &:before {
      left: 2px;
    }
    &:after {
      left: 1px;
    }
  }

  &[data-placement^='right'] ${ArrowPopoverUI} {
    &:before {
      left: -2px;
    }
    &:after {
      left: -1px;
    }
  }
`

export const HeaderUI = styled('div')`
  border-bottom: 1px solid ${config.borderColor};
  margin-bottom: ${config.padding};
  margin-left: calc(${config.padding} * -1);
  margin-right: calc(${config.padding} * -1);
  margin-top: calc(${config.padding} * -1);
  padding: 10px ${config.padding};
`

export const HeadingUI = styled(Heading)`
  color: ${getColor('charcoal.300')};
`
HeadingUI.defaultProps = {
  size: 'h4',
  weight: 400,
}
