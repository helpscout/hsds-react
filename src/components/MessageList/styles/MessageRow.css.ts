import styled from '../../styled'
import Flexy from '../../Flexy'
import { getColor } from '../../../styles/utilities/color'
import Icon from '../../Icon/index'

export const IconUI = styled(Icon)`
  left: 1px;
  top: 1px;
`

export const HandleUI = styled('div')`
  color: ${getColor('grey.700')};
  cursor: move;
  display: block;
  height: 24px;
  left: 15px;
  pointer-events: all;
  position: absolute;
  top: 14px;
  padding: 0;
  margin: 0;
  width: 24px;
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
  &.is-dragging {
    background-color: ${getColor('grey.200')};
    border-bottom: none;
  }
`
