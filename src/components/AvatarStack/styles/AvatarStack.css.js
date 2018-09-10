// @flow
import AnimateGroup from '../../AnimateGroup'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const config = {
  borderWidth: 2,
}

export const AvatarStackUI = styled(AnimateGroup)`
  ${baseStyles} display: flex;
  padding-left: ${config.borderWidth * 3}px;
`

export const ItemUI = styled('div')`
  position: relative;
  margin-left: -${config.borderWidth * 3}px;
`
