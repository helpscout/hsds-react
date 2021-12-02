import styled from 'styled-components'
import { ButtonUI } from '../Button/Button.css'

export const IconContainerUI = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .c-Avatar {
    width: 100%;
    height: 100%;
  }
`

export const IconButtonUI = styled(ButtonUI)`
  &.is-size-xl {
    min-width: var(--buttonHeight);

    ${IconContainerUI} {
      width: 36px;
      height: 36px;
    }

    &.is-rounded {
      --buttonPadding: 3px;
    }
  }

  &.is-size-lg {
    min-width: var(--buttonHeight);

    ${IconContainerUI} {
      width: 32px;
      height: 32px;
    }

    &.is-rounded {
      --buttonPadding: 3px;
    }
  }
  &.is-size-sm {
    min-width: var(--buttonHeight);

    ${IconContainerUI} {
      width: 24px;
      height: 24px;
    }

    &.is-rounded {
      --buttonPadding: 2px;
    }
  }

  &.is-style-outlined:not(.has-children):not(.is-seamless) {
    box-shadow: inset 0 0 0 3px white;
  }
`

export const ChildrenUI = styled.span`
  margin-left: 8px;
  margin-right: 16px;

  &.has-icon {
    margin-left: 4px;
  }
`
