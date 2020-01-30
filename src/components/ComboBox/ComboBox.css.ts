import Dropdown from '../Dropdown/DropdownV2'
import Input from '../Input'

import styled from 'styled-components'

export const InputUI = styled(Input)`
  padding-left: 10px;
  padding-right: 10px;
`

export const HeaderUI = styled('div')`
  flex: none;
  max-height: 100%;
  min-height: 0;
  padding: 10px;
`

export const MenuUI = styled(Dropdown.Menu)`
  &.is-withInput {
    padding-top: 0;
  }
`

export const EmptyItemUI = styled('div')`
  padding: 8px 16px;
  word-break: break-word;

  > .c-Text {
    line-height: 1.25;
  }
`
