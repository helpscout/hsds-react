import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'
import Timestamp from '../Timestamp'
import { generateLinkStyles } from '@hsds/utils-mixins'

export const ActionUI = styled('div')`
  line-height: 22px;
  text-align: center;
  margin: 10px 0;

  ${({ isThemeEmbed }) =>
    !isThemeEmbed && `color: ${getColor('charcoal.700')} !important;`}

  a {
    ${generateLinkStyles()}
  }
`
export const TimestampUI = styled(Timestamp)`
  .c-Flexy {
    justify-content: center !important;
  }
`
