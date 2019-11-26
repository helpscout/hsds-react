import styled from 'styled-components'

interface FormLabelUIProps {
  isHelpTextPresent?: any
  isInline?: any
}
export const FormLabelUI = styled('div')<FormLabelUIProps>`
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
export function calculateContentRules({
  isInline,
  isHelpTextPresent,
}: FormLabelUIProps): string {
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
