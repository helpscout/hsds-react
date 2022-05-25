import styled from 'styled-components'
import SkeletonBlock from './Skeleton.Block'
import { config as avatarConfig } from '../Avatar/Avatar.css'
import { forEach } from '@hsds/utils-sass'

export const config = {
  ...avatarConfig,
}

export const AvatarUI = styled(SkeletonBlock)`
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

function getSizeStyles() {
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
