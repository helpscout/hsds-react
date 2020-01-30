import styled from 'styled-components'
import FluffyCard from '../FluffyCard'

import { getColor } from '../../styles/utilities/color'

export const PromoCardUI = styled(FluffyCard)`
  border: 0;
  overflow: hidden;
  padding: 40px;
  position: relative;
`

export const BorderUI = styled('div')<{ borderColor?: any }>`
  border-top: 3px solid;
  border-top-color: ${props => getColor(`${props.borderColor}.500`)};
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
