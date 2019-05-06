import styled from '../../styled'
import Flexy from '../../Flexy'
import Icon from '../../Icon'
import { getColor } from '../../../styles/utilities/color'

export const ErrorIconUI = styled(Icon)``

ErrorIconUI.defaultProps = {
  name: 'alert',
  state: 'error',
}

export const PauseIconUI = styled(Icon)`
  color: ${getColor('grey.700')};
`
PauseIconUI.defaultProps = {
  name: 'pause',
}

export const ContentUI = styled(Flexy)`
  padding-right: 5px;
`
