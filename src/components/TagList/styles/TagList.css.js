// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const TagListUI = styled('div')`
  ${baseStyles} max-height: 40px;
  overflow: hidden;
  will-change: contents;
`

export default TagListUI
