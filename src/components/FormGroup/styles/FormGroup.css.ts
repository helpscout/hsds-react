import baseStyles from '../../../styles/resets/baseStyles.css'
import styled from 'styled-components'

export const FormGroupUI = styled('div')`
  ${baseStyles};
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

export default FormGroupUI
