import styled from 'styled-components'

export const FormGroupUI = styled('div')`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const FormGroupChoiceUI = styled('div')`
  margin-bottom: 8px;

  &.is-responsive {
    flex: 1;
    max-width: 100%;
    min-width: 0;
  }
`
