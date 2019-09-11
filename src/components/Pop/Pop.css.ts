import baseStyles from '../../styles/resets/base.css.js'
import { styledComponent } from '../styled'

export const PopUI = styledComponent('span')`
  ${baseStyles};

  &.is-display-block {
    display: block;
  }

  &.is-display-inline-block {
    display: inline-block;
  }
`
