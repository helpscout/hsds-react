import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Timestamp from '../Timestamp'
import linkStyles from '../../styles/mixins/linkStyles.css'

export const ActionUI = styled('div')`
  line-height: 22px;
  text-align: center;
  margin: 10px 0;

  ${({ isThemeEmbed }) =>
    !isThemeEmbed && `color: ${getColor('charcoal.700')} !important;`}

  a {
    ${linkStyles()}
  }
`
export const TimestampUI = styled(Timestamp)`
  .c-Flexy {
    justify-content: center !important;
  }
`
