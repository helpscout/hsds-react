import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { rgba } from '../../utilities/color'
import { defaultAnimation as overlayAnimation } from '../../hooks/useAnimatedRender'

export const CloseModalButtonUI = styled('button')`
  position: absolute;
  padding: 5px;
  background: #fff;
  border: 0;
  border-radius: 50%;
  color: ${getColor('charcoal.400')};
  top: 10px;
  right: 10px;
  height: 28px;
  width: 28px;
  background-color: ${getColor('grey.300')};
  z-index: 1;

  &:hover {
    color: ${getColor('charcoal.600')};
    background-color: ${getColor('grey.400')};
    cursor: pointer;
  }

  &:active,
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${getColor('blue.400')};
  }
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
  z-index: ${({ zIndex }) => zIndex};
  ${overlayAnimation}
`

export const SimpleModalUI = styled('div')`
  position: relative;
  width: 360px;
  height: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  &.with-padding {
    padding: 27px;
  }
`
