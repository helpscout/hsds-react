import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css.js'
import { getColor } from '../../styles/utilities/color'

export const config = {
  color: getColor('grey.700'),
}

export const PaginationUI = styled('div')`
  ${baseStyles};
`
