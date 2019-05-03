//
import base from '../../../styles/resets/base.css.js'
import styled from '../../styled/index'

export const ItemUI = styled('div')`
  ${base} &.is-inlineItem {
    max-width: 100%;
  }

  &.is-defaultItem {
    max-width: 100%;
    min-width: 0;
  }
`
