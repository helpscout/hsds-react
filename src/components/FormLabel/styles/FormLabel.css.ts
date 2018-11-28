import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const FormLabelUI = styled('div')`
  ${baseStyles};
  display: flex;
  flex-flow: ${props => (props.inline ? 'row' : 'column')};
  justify-content: space-between;
  align-items: ${props => (props.inline ? 'flex-end' : 'stretch')};

  & .c-FormLabel__label {
    margin-right: ${props => (props.inline ? '40px' : '0')};
  }
  & .c-FormLabel__helpText {
    padding-bottom: ${props => (props.inline ? '0' : '4px')};
  }
`

export const FormLabelHelpTextUI = styled('div')`
  padding-bottom: 4px;
`

export default FormLabelUI
