import { getColor } from '../../styles/utilities/color'
import variableFontSize from '../../styles/utilities/variableFontSize'
import styled from '../styled'

import Heading from '../Heading'
import Text from '../Text'
import Illo from '../Illo'

export const IlloUI = styled(Illo)`
  padding-bottom: 18px;
  margin: 0;
  align-self: center;
`

export const HeadingUI = styled(Heading)`
  &.is-h3 {
    ${variableFontSize({ fontSize: 18 })};
  }
  color: ${getColor('charcoal.800')};
`

export const TextUI = styled(Text)`
  color: ${getColor('charcoal.300')};
  padding-top: 8px;

  b,
  strong {
    color: ${getColor('charcoal.500')};
  }
`

export const BlankSlateUI = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 56px 0 68px;

  &.align-top {
    justify-content: flex-start;
  }

  &.with-light-background {
    background-color: ${getColor('grey.200')};

    ${TextUI} {
      color: ${getColor('charcoal.400')};

      b,
      strong {
        color: ${getColor('charcoal.600')};
      }
    }
  }
`
