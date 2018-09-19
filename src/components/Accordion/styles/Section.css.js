// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const SectionUI = styled('div')`
  ${baseStyles};
`

export const BodyUI = styled('div')`
  ${baseStyles};
  display: none;

  &.is-open {
    display: block;
  }
`
