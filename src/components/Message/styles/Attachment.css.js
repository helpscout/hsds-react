import styled from 'styled-components'
import baseStyles from '../../../styles/resets/baseStyles.css'
import Chat from '../Message.Chat'
import Text from '../../Text'

export const TextUI = styled(Text)`
  &.has-noUrl {
    opacity: 0.4;
  }
`

export const AttachmentChatUI = styled(Chat)``
