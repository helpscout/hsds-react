import styled from '../../src/components/styled'

import FormLabel from '../../src/components/FormLabel'
import Icon from '../../src/components/Icon'
import Input from '../../src/components/Input'

export const Wrapper = styled('div')`
  margin-bottom: 50px;
`

export const FlexContainerForForms = styled('div')`
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
  margin-bottom: 15px;
`
export const FlexContainerForHeadings = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
export const FlexQuarter = styled('div')`
  width: 22%;
`

export const FlexHalf = styled('div')`
  width: 48%;
`

export const Header = styled('header')`
  margin-bottom: 0.5em;
`

export const FormLabelUI = styled(FormLabel)`
  margin-bottom: 10px;

  & .c-FormLabel__label {
    margin-right: 5px !important;
  }

  & .c-FormLabel__content {
    margin-top: 0 !important;
  }
`

export const InputWithBorder = styled(Input)`
  & .c-InputBackdropV2 {
    ${({ borderStyle }) => `border: ${borderStyle};`};
  }
`

export const IconUI = styled(Icon)`
  margin-right: 5px;
`
