import baseStyles from '../../styles/resets/base.css.js'
import styled from '../styled'

export const PopUI = styled('span')`
  ${baseStyles};

  &.is-display-block {
    display: block;
  }

  &.is-display-inline-block {
    display: inline-block;
  }
`
