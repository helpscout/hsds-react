import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { rgba } from '../../utilities/color'
import { defaultAnimation as overlayAnimation } from '../../hooks/useAnimatedRender'
import IconButton from '../IconButton'

export const CloseModalButtonUI = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: ${({ $zIndex }) => $zIndex};
`

export const SimpleModalOverlayUI = styled('div')`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${rgba(getColor('blue.800'), 0.7)};
  z-index: ${({ $zIndex }) => $zIndex};
  ${overlayAnimation}
`

export const SimpleModalUI = styled('div')`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  &:focus {
    outline: 2px solid ${getColor('yellow.600')};
    outline-offset: 2px;
  }
`
