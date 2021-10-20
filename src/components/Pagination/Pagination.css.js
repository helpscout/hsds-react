import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Button from '../Button'
import config from '../Button/Button.config'
import { focusRing } from '../../styles/mixins/focusRing.css'

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
  ${focusRing}
  &.is-default {
    width: 24px;
    height: 24px;
  }
  &.is-default:focus,
  &.is-default.is-focused {
    color: ${config.default.colorActive};
  }

  & + & {
    margin-left: 2px;
  }
`
