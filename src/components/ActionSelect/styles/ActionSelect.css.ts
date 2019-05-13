import styled from '../../styled'
import Backdrop from '../../Input/Input.BackdropV2'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  backgroundColor: getColor('grey.200'),
  borderColor: getColor('grey.600'),
  borderRadius: '3px',
  padding: '20px',
  transition: 'height 160ms ease',
}

export const ActionSelectUI = styled('div')`
  ${baseStyles};

  &.is-withContent {
    .c-ActionSelectDropdownWrapper {
      .${Backdrop.className} {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
`

export const ContentUI = styled('div')`
  ${baseStyles};
  background-color: ${config.backgroundColor};
  border-bottom-left-radius: ${config.borderRadius};
  border-bottom-right-radius: ${config.borderRadius};
  padding: ${config.padding};
  position: relative;

  &::before {
    background-color: rgba(0, 0, 0, 0.05);
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

export const ContentResizerUI = styled('div')`
  ${baseStyles};
  border: 1px solid ${config.borderColor};
  border-top: none;
  border-bottom-left-radius: ${config.borderRadius};
  border-bottom-right-radius: ${config.borderRadius};
  overflow: hidden;
  height: 0;
  transition: ${config.transition};
  will-change: height;
`
