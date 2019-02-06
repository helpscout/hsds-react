import styled from '../../styled'
import Card from '../../Card'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'

export const PromoCardUI = styled(Card)`
  ${baseStyles};
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`

export const BorderUI = styled('div')`
  border-top: 2px solid;
  border-top-color: ${props => getColor(`${props.borderColor}.500`)};
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const ContentUI = styled('div')`
  ${baseStyles};
`
