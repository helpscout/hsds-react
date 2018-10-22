// @flow
import AnimateGroup from '../../AnimateGroup'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const config = {
  borderWidth: 2,
}

export const AvatarStackUI = styled(AnimateGroup)`
  ${baseStyles};
  display: flex;
  padding-left: ${config.borderWidth * 3}px;
  position: relative;

  .c-AvatarStack__content {
    display: flex;
    position: relative;
  }
`

export const AvatarStackV2UI = styled(AvatarStackUI)`
  .c-AvatarStack__content {
    align-items: center;
    justify-content: center;
    margin: auto;
    max-width: 230px;
    min-height: 64px;
    width: 100%;
    min-width: 0;
  }
`

export const ItemUI = styled('div')`
  position: relative;
  margin-left: -${config.borderWidth * 3}px;
`
