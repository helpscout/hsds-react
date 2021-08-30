// Deprecated
/* istanbul ignore file */
import styled from 'styled-components'

export const config = {
  borderWidth: '2px',
}

const AvatarStackUI = styled('div')`
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
  position: relative;

  &.is-withLayerStack {
    margin-left: 0;
  }
`
