import { css } from 'styled-components'
import { messageVariableClassName } from './MessageCard.utils'
import { getColor } from '../../../styles/utilities/color'

export const messageVariablePill = css`
  .${messageVariableClassName} {
    display: inline-flex;
    max-width: 50%;
    padding: 3px 8px;
    margin-right: 4px;
    height: 20px;
    line-height: 17px;
    align-items: center;
    color: ${getColor('purple.800')};
    background-color: ${getColor('purple.200')};
    border-radius: 100px;

    &__text {
      max-width: 100%;

      // clearing any text style coming from b or i elements, as we want to have it always display the same
      font-style: normal;
      font-weight: normal;
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`
