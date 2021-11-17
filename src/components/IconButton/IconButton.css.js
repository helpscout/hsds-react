import styled, { css } from 'styled-components'
import Button from '../Button/index'
import buttonConfig from '../Button/Button.config'

export const config = {
  size: buttonConfig.size,
  transition: `background-color 120ms ease`,
}

export const IconButtonUI = styled(Button)`
  transition: ${config.transition};

  &.is-borderless,
  &.is-borderless:hover {
    border-color: transparent !important;
  }

  ${makeButtonSizeStyles('xl', config.size.xl)};
  ${makeButtonSizeStyles('lg', config.size.lg)};
  ${makeButtonSizeStyles('md', config.size.md)};
  ${makeButtonSizeStyles('sm', config.size.sm)};
  ${makeButtonSizeStyles('xs', config.size.xs)};
  ${makeButtonSizeStyles('xxs', config.size.xxs)};

  ${makeButtonSizeStyles()};
  ${makeButtonHoverStyles()};

  .c-Icon {
    margin: auto;
  }
  .c-Icon.withCaret {
    margin-left: 0;
  }
  .c-Icon__icon.is-caret {
    right: -2px;
  }
`

function makeButtonSizeStyles(size, config) {
  return css`
    &.is-${size} {
      --buttonPadding: 0.2em;
      width: var(--buttonHeight);
    }
  `
}

function makeButtonHoverStyles() {
  return css`
    &.is-kind-default,
    &.is-kind-secondary,
    &.is-kind-tertiary,
    &.is-kind-link {
      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
      &:active {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  `
}
