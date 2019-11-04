import baseStyles from '../../../styles/resets/baseStyles.css'
import styled from 'styled-components'

export const FormGroupChoiceUI = styled('div')`
  ${baseStyles};
  margin-bottom: 8px;

  &.is-responsive {
    flex: 1;
    max-width: 100%;
    min-width: 0;
  }
`

export default FormGroupChoiceUI
