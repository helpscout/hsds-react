// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const config = {
  minWidth: 480,
  maxWidth: 700,
  transition: 'width 200ms ease',
}

export const PageUI = styled('div')`
  ${baseStyles} margin-left: auto;
  margin-right: auto;
  max-width: ${config.maxWidth}px;
  min-width: ${config.minWidth}px;
  transition: ${config.transition};
  width: 100%;
`

export default PageUI
