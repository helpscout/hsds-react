import styled from '../styled/index'
import FluffyCard from '../FluffyCard'
import baseStyles from '../../styles/resets/baseStyles.css'
import { getColor } from '../../styles/utilities/color'

export const PromoCardUI = styled(FluffyCard)`
  border: 0;
  overflow: hidden;
  padding: 40px;
  position: relative;
`

export const BorderUI = styled('div')`
  border-top: 3px solid;
  border-top-color: ${props => getColor(`${props.borderColor}.500`)};
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const ContentUI = styled('div')`
  ${baseStyles};
`
