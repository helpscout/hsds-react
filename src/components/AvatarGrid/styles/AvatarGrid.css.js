import styled from 'styled-components'

import baseStyles from '../../../styles/resets/baseStyles.css.js'

export const AvatarGridWrapperUI = styled.div`
  ${baseStyles};

  &.is-center {
    text-align: center;
  }
`

export const AvatarGridContainerUI = styled.div`
  ${baseStyles};

  display: inline-block;
  min-width: 32px;
  max-width: 260px;
`

export const AvatarGridUI = styled.div`
  ${baseStyles}

  align-items: center;
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 3px;
  }
`
