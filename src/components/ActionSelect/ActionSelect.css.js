import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const config = {
  backgroundColor: getColor('grey.200'),
  borderColor: getColor('grey.800'),
  borderRadius: '3px',
  padding: '20px',
  transition: 'height 160ms ease',
}

export const ActionSelectUI = styled('div')`
  .c-ActionSelectDropdownWrapper {
    width: 100%;
    position: relative;
  }

  .DropList__Select,
  div[id*='tippy'],
  .SelectTagToggler {
    width: 100%;
  }

  &.is-withContent {
    .SelectTagToggler {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`

export const ContentUI = styled('div')`
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
  background-color: ${config.backgroundColor};
  border: 1px solid ${config.borderColor};
  border-top: none;
  border-bottom-left-radius: ${config.borderRadius};
  border-bottom-right-radius: ${config.borderRadius};
  overflow: hidden;
  height: 0;
  transition: ${config.transition};
  will-change: height;
`
