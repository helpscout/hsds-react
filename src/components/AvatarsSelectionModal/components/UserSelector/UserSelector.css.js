import styled from 'styled-components'
import { getColor } from '../../../../styles/utilities/color'
import CheckMarkCard from '../../../CheckMarkCard'

export const BlankSlate = styled('div')`
  align-items: center;
  color: ${getColor('charcoal.300')};
  display: flex;
  font-size: 14px;
  height: 100%;
  justify-content: center;
`

export const CheckMarkCardGridUI = styled(CheckMarkCard.Grid)`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 20px;
`
