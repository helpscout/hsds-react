import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from 'styled-components'

export const config = {
  borderRadius: 3,
  borderWidth: 1,
}

export const ItemUI = styled('div')`
  ${baseStyles} margin-top: 0;
  min-width: 0;
  position: relative;
  width: auto;

  & + *:not(:first-child) {
    margin-left: -${config.borderWidth}px;
  }

  &.is-block {
    flex: 1;
    max-width: 100%;
  }
`

export default ItemUI
