import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Button from '../Button'

export const PaginationUI = styled.nav`
  padding: 0 10px;
  min-height: 36px;
  display: flex;
  align-items: center;
  width: 100%;
`

export const NavigationUI = styled('div')`
  margin-left: auto;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
`

export const InformationUI = styled('div')`
  flex: 1 1 100%;
  white-space: nowrap;
  color: ${getColor('charcoal.200')};
  padding: 10px 0;
`

export const RangeUI = styled('span')`
  color: ${getColor('charcoal.600')};
  font-weight: 600;
`

export const ButtonIconUI = styled(Button)`
  &.is-theme-grey {
    --focusRingOffset: -2px;
    --buttonPadding: 0;
    --buttonHeight: 26px;
    --buttonMinWidth: 0;
    height: 26px;

    &.is-style-outlined {
      --buttonTextColorHover: ${getColor('charcoal.700')};
      --buttonBorderColorHover: transparent;
      --buttonBorderColor: transparent;
    }
    &[disabled] {
      border-color: transparent !important;
    }
  }

  & + & {
    margin-left: 2px;
  }
`
