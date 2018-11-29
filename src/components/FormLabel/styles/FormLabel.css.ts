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
  & .c-FormLabel__content {
    ${props => calculateContentRules(props)};
  }
`
/**
 * Method to generate the correct rules to align the content
 * vertically in inline mode depending on whether Help Text
 * is present or not
 * @param props {inline:boolean, isHelpTextPresent:boolean }
 */
type funcArg = { inline: boolean; isHelpTextPresent: boolean }
export function calculateContentRules({
  inline,
  isHelpTextPresent,
}: funcArg): string {
  if (inline) {
    if (isHelpTextPresent) {
      return `
        align-self: flex-start;
        margin-top: 1.4em;
      `
    }
    return 'align-self: center;'
  }
  return 'align-self: initial;'
}

export const FormLabelHelpTextUI = styled('div')`
  padding-bottom: 4px;
`

export default FormLabelUI
