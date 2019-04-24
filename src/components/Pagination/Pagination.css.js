import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import { getColor } from '../../styles/utilities/color'
import Button from '../Button'

import { config } from '../Button/Button.css'

export const PaginationUI = styled('div')`
  ${baseStyles};

  padding: 0 10px;
  min-height: 36px;
  display: flex;
  align-items: center;
  width: 100%;
`

export const NavigationUI = styled('div')`
  margin-left: auto;
  flex: 0 0 auto;
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
  &.is-default:focus,
  &.is-default.is-focused {
    color: ${config.default.colorActive};
  }
`
