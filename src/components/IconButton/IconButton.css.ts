import styled from '../styled'
import Button from '../Button/ButtonV2'
import { config as buttonConfig } from '../Button/Button.css'
import forEach from '../../styles/utilities/forEach'

export const config = {
  size: buttonConfig.size,
}

export const IconButtonUI = styled(Button)`
  ${makeButtonSizeStyles};
`

function makeButtonSizeStyles() {
  return forEach(
    config.size,
    (size, props) => `
    &.is-${size} {
      height: ${props.height}px;
      min-width: ${props.height}px;
      padding-left: 0;
      padding-right: 0;
    }
  `
  )
}
