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
    --buttonPadding: 3px;
    min-width: var(--buttonHeight);

    ${IconContainerUI} {
      width: 36px;
      height: 36px;
    }
  }

  &.is-size-lg {
    --buttonPadding: 3px;
    min-width: var(--buttonHeight);

    ${IconContainerUI} {
      width: 32px;
      height: 32px;
    }
  }
`

export const ChildrenUI = styled.span`
  margin-left: 8px;
  margin-right: 16px;

  &.has-icon {
    margin-left: 4px;
  }
`
