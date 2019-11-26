import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'
import { Avatar } from '../../index'
import Icon from '../../Icon'

export const AvatarSelectorWrapperUI = styled('div')`
  width: 50px;
  height: 30px;
  display: block;
  position: relative;
  border-radius: 16px;
  background-color: ${getColor('grey.400')};
  z-index: 2;

  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: '';
    border: 1px solid transparent;
    left: -1px;
    top: -1px;
    box-shadow: 0px 0px 0px 2px ${getColor('blue.400')};
    z-index: 0;
    border-radius: 30px;
    display: none;
    opacity: 1;
  }

  &:focus {
    outline: none;

    &::before {
      display: block;
      opacity: 1;
    }
  }

  &:hover {
    background-color: ${getColor('grey.500')};
  }
`
export const AvatarSelectorUI = styled('div')`
  float: right;
  border-radius: 16px;
  color: ${getColor('charcoal.500')};
  height: 32px;
  position: absolute;
  right: 0;
  top: 0;
  width: 52px;
  z-index: -1;
`

export const AvatarUI = styled(Avatar)`
  border-radius: 50%;
  border: 2px solid #fff;
`

export const IconCaretUI = styled(Icon)`
  position: absolute;
  right: 6px;
  top: 9px;
  z-index: 2;
`
export const IconAssignUI = styled(Icon)`
  position: absolute;
  top: 5px;
  left: 11px;
  z-index: 1;
`
