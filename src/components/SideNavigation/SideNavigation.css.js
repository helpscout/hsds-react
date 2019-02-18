import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import { getColor } from '../../styles/utilities/color'

export const SideNavigationUI = styled('div')`
  ${baseStyles};
  background-color: ${getColor('grey.300')};
  border-right: 1px solid ${getColor('grey.500')};
  height: 100%;
  width: 250px;

  &.is-collapsed {
    width: 50px;
  }
`

export const SideNavigationSectionUI = styled('div')``
export const SideNavigationItemUI = styled('div')``
export const SideNavigationHeaderUI = styled('div')``
