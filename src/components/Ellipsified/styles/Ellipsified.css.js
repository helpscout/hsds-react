import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const ContainerUI = styled('div')`
  ${baseStyles} overflow: hidden;
  ${({ lines, lineHeight }) => `max-height: ${lines * lineHeight}px`};
`

export const OneLineEllipsisUI = styled('div')`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
