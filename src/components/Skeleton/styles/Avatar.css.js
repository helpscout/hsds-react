import styled from '../../styled'
import Block from '../Block'
import { config as avatarConfig } from '../../Avatar/styles/Avatar.css.js'
import forEach from '../../../styles/utilities/forEach'

export const config = {
  ...avatarConfig,
}

export const AvatarUI = styled(Block)`
  height: ${config.size.md.size}px;
  margin-bottom: 8px;
  width: ${config.size.md.size}px;

  &.is-circle {
    border-radius: 200%;
  }
  &.is-rounded {
    border-radius: 3px;
  }
  &.is-square {
    border-radius: 0;
  }

  ${getSizeStyles};
`

function getSizeStyles(): string {
  return forEach(config.size, (size, props) => {
    const { size: sz } = props

    return `
      &.is-${size} {
        height: ${sz}px;
        width: ${sz}px;
      }
    `
  })
}
