import styled from 'styled-components'
import baseStyles from '../../../styles/resets/baseStyles.css'
import linkStyles from '../../../styles/mixins/linkStyles.css'
import ChatBlock from '../Message.ChatBlock'

export const ActionChatBlockUI = styled(ChatBlock)`
  ${baseStyles}
  padding-bottom: 4px;
  padding-top: 4px;

  a {
    ${linkStyles()}
  }
`
