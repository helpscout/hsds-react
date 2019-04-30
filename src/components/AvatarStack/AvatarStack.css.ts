import baseStyles from '../../styles/resets/baseStyles.css'
import styled from '../styled'

export const config = {
  borderWidth: '2px',
}

export const AvatarStackUI = styled('div')`
  ${baseStyles};
  display: flex;
  position: relative;

  &.is-withLayerStack {
    padding-left: calc(${config.borderWidth} * 3);
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
    margin-left: 0;
  }
`
