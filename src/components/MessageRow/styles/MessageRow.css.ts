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

export const HandleUI = styled('div')`
  pointer-events: all;
  z-index: 9999;
  width: 20px;
  height: 20px;
  display: block;
  position: absolute;
  left: 0;
  top: 20;
`

export const SortableItemUI = styled('div')`
  width: 100%;
  pointer-events: all;
  z-index: 2;
  position: relative;
`
