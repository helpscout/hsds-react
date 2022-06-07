import styled from 'styled-components'
import SkeletonBlock from './Skeleton.Block'
import { forEach } from '@hsds/utils-sass'

export const config = {
  size: {
    lg: '48px',
    md: '40px',
    sm: '32px',
  },
}

export const ControlUI = styled(SkeletonBlock)`
  border-radius: 4px;
  height: ${config.size.md};
  width: 100%;

  ${getSizeStyles};
`

function getSizeStyles() {
  return forEach(config.size, (size, props) => {
    const { size: sz } = props

    return `
      &.is-${size} {
        height: ${sz}px;
      }
    `
  })
}
