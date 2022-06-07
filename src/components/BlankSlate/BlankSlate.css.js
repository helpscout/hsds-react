import { getColor } from '@hsds/utils-color'
import { variableFontSize } from '@hsds/utils-fonts'
import styled from 'styled-components'

import Heading from '../Heading'
import Text from '../Text'

export const IlloUI = styled('div')`
  margin: 0;
  margin-bottom: 18px;
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
  padding: 56px 8px 68px;

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
