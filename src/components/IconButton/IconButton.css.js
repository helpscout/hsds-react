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
  border-radius: 100px;
  --focusRingRadius: 100px;

  &.is-size-xl,
  &.is-size-lg {
    min-width: var(--buttonHeight);
    --buttonPadding: 3px;
  }

  &.is-size-sm {
    min-width: var(--buttonHeight);
    --buttonPadding: 2px;
  }

  &.has-icon-only {
    min-width: 0;
    width: var(--buttonHeight);
    padding: var(--buttonPadding);
  }

  ${IconContainerUI} {
    height: calc(var(--buttonHeight) - calc(var(--buttonPadding) * 2) - 2px);
    aspect-ratio: 1;
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
