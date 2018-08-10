// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import styled from '../../styled'

export const config = {
  borderColor: {
    default: 'rgba(0, 0, 0, 0.1)',
    focused: getColor('grey.500'),
  },
  marginBottom: 20,
  padding: {
    default: '60px 100px',
  },
}

export const CardUI = styled('div')`
  ${baseStyles} background-color: white;
  border: 1px solid;
  border-color: ${config.borderColor.default};
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: ${config.padding.default};
  margin-bottom: ${config.marginBottom}px;
  width: 100%;

  &:hover {
    border-color: ${config.borderColor.focused};
  }
`

export default CardUI
