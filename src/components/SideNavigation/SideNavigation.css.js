import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import { getColor } from '../../styles/utilities/color'

const config = {
  sidePadding: '18px',
}

export const SideNavigationUI = styled('div')`
  ${baseStyles};
  background-color: ${getColor('grey.300')};
  border-right: 1px solid ${getColor('grey.500')};
  height: 100%;
  width: 250px;
  padding-top: 16px;
  padding-bottom: 100px;

  &.is-collapsed {
    width: 50px;
  }
`

export const SideNavigationSectionUI = styled('div')``
export const SideNavigationItemUI = styled('div')``

export const SideNavigationHeaderUI = styled('div')`
  padding: 0 ${config.sidePadding};
  color: ${getColor('charcoal.500')};
  margin-bottom: 16px;

  a {
    color: ${getColor('charcoal.500')};
    text-decoration: none;

    &:hover {
      color: ${getColor('charcoal.800')};
      cursor: pointer;
    }
  }
`
