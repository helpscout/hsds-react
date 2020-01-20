import sequencesStyles from './AnimateSequences.css'
import styled from 'styled-components'

export const AnimateUI = styled('div')`
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;

  &.is-block {
    display: block;
  }
  &.is-inline {
    display: inline;
  }
  &.is-inlineBlock {
    display: inline-block;
  }

  ${sequencesStyles};
`

export default AnimateUI
