import styled from '../styled'
import baseStyles from '../../styles/resets/baseStyles.css'

export const StepperUI = styled('div')`
  ${baseStyles};
  display: flex;
`

export const StepUI = styled('div')`
  ${baseStyles};
  margin-right: 90px;

  &:last-of-type {
    margin-right: 0;
  }
`
