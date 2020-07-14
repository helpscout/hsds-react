import styled from 'styled-components'
import Button from '../Button/index'
import buttonConfig from '../Button/Button.config'
import forEach from '../../styles/utilities/forEach'
import { getColor } from '../../styles/utilities/color'

export const config = {
  size: buttonConfig.size,
  transition: `background-color 120ms ease`,
}

export const IconButtonUI = styled(Button)`
  transition: ${config.transition};

  .c-Button__content {
    display: block;
  }

  &.is-borderless,
  &.is-borderless:hover {
    border-color: transparent !important;
  }

  ${makeButtonSizeStyles};
  ${makeButtonHoverStyles};

  .c-Icon {
    margin: auto;
  }
  .c-Icon.withCaret {
    margin-left: -3px;
  }
`

function makeButtonSizeStyles() {
  return forEach(
    config.size,
    (size, props) => `
    &.is-${size} {
      height: ${props.height}px;
      min-width: ${props.height}px;
      padding-left: 0.2em;
      padding-right: 0.2em;
    }
  `
  )
}

function makeButtonHoverStyles() {
  return `
    &.is-kind-default,
    &.is-kind-secondary,
    &.is-kind-tertiary,
    &.is-kind-link {
      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
      &:focus {
        background: rgba(0, 0, 0, 0.05);
      }
      &:active {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  `
}
