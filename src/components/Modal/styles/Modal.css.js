// @flow
import styled from '../../styled'

export const config = {
  closeOffset: 8,
}

export const CloseUI = styled('div')`
  position: absolute;
  right: ${config.closeOffset}px;
  top: ${config.closeOffset}px;
  transform: translateZ(0);
  z-index: 3;
`
