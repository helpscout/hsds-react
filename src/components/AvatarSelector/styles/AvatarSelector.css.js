import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'
import { Avatar } from '../../index'
import Icon from '../../Icon'

export const AvatarSelectorWrapperUI = styled('div')`
  width: 52px;
  position: relative;
`
export const AvatarSelectorUI = styled('div')`
  ${baseStyles};
  float: right;
  background-color: ${getColor('grey.400')};
  border-radius: 16px;
  position: absolute;
  right: 0;
  top: 0;
  height: 30px;
  width: 52px;
  z-index: -1;
  color: ${getColor('charcoal.500')};
`

export const AvatarUI = styled(Avatar)`
  border-radius: 50%;
  border: 2px solid #fff;
`

export const IconCaretUI = styled(Icon)`
  position: absolute;
  right: 7px;
  top: 9px;
`

export const IconAssignUI = styled(Icon)``
