import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'

export const FormLabelUI = styled('div')`
  ${baseStyles};
  display: flex;
  flex-flow: column;
  align-items: stretch;

  &.is-inline {
    flex-flow: row;
    align-items: flex-end;
    justify-content: space-between;

    .c-FormLabel__label {
      margin-right: 40px;
    }
    .c-FormLabel__helpText {
      padding-bottom: 0;
    }
  }

  & .c-FormLabel__content {
    ${props => calculateContentRules(props)};
  }
`

export const FormLabelHelpTextUI = styled('div')`
  padding-bottom: 4px;
`

export default FormLabelUI

/**
 * Method to generate the correct rules to align the content
 * vertically in inline mode depending on whether Help Text
 * is present or not
 * @param props {isInline:boolean, isHelpTextPresent:boolean }
 */
type funcArg = { isInline: boolean; isHelpTextPresent: boolean }
export function calculateContentRules({
  isInline,
  isHelpTextPresent,
}: funcArg): string {
  if (isInline) {
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
