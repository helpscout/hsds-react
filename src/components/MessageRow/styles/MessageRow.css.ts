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

export const HandleUI = styled('div')`
  color: ${getColor('grey.700')};
  display: block;
  height: 20px;
  left: 15px;
  margin: 15px;
  pointer-events: all;
  position: absolute;
  top: 0;
  width: 20px;
`

export const ContentUI = styled(Flexy)`
  margin-left: -10px;
  padding-right: 5px;
`

export const SortableItemUI = styled('div')`
  border-bottom: 1px solid ${getColor('border')};
  pointer-events: all;
  position: relative;
  width: 100%;
  z-index: 2;
`
