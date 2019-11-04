import styled from 'styled-components'

export const ImageUI = styled.img`
  box-sizing: border-box;
  height: auto;
  max-width: 100%;

  ${({ size }) =>
    size.width &&
    `
    width: ${size.width}px;
  `}
  ${({ size }) =>
    size.height &&
    `
    height: ${size.height}px;
  `}

  &.is-block {
    display: block;
  }

  &.is-rounded {
    border-radius: 4px;
  }
`
