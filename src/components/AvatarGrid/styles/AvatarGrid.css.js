import styled from 'styled-components'

export const AvatarGridWrapperUI = styled.div`
  &.is-center {
    text-align: center;
  }
`

export const AvatarGridContainerUI = styled.div`
  display: inline-block;
  min-width: 32px;
  max-width: 260px;
`

export const AvatarGridUI = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 3px;
  }
`
