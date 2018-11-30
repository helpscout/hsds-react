import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const config = {
  borderWidth: 2,
}

export const AvatarStackUI = styled('div')`
  ${baseStyles};
  display: flex;
  position: relative;

  &.is-withLayerStack {
    padding-left: ${config.borderWidth * 3}px;
  }
`

export const AvatarStackLayeringUI = styled(AvatarStackUI)`
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 230px;
  min-height: 64px;
  width: 100%;
  min-width: 0;
`

export const ItemUI = styled('div')`
  ${baseStyles};
  position: relative;

  &.is-withLayerStack {
    margin-left: -${config.borderWidth * 3}px;
  }
`
