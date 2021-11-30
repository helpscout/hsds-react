import styled from 'styled-components'
import { ButtonUI } from '../Button/Button.css'

export const IconButtonUI = styled(ButtonUI)`
  &.is-size-xl {
    --buttonPadding: 3px;
    min-width: var(--buttonHeight);
  }

  :last-child {
    margin-right: 4px;
  }
`

export const IconContainerUI = styled.span`
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`

export const ChildrenUI = styled.span`
  margin-left: 4px;
  margin-right: 16px;
`
