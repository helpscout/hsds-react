import styled from '../../styled'
import Block from '../Block'
import forEach from '../../../styles/utilities/forEach'

export const config = {
  size: {
    lg: '48px',
    md: '40px',
    sm: '32px',
  },
}

export const ControlUI = styled(Block)`
  border-radius: 4px;
  height: ${config.size.md};
  width: 100%;

  ${getSizeStyles};
`

function getSizeStyles(): string {
  return forEach(config.size, (size, props) => {
    const { size: sz } = props

    return `
      &.is-${size} {
        height: ${sz}px;
      }
    `
  })
}
