import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import { getColor } from '../../styles/utilities/color'

export const config = {
  color: getColor('grey.700'),
}

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
