import { styledComponent } from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import Chat from '../Message.Chat'
import Text from '../../Text'

export const TextUI = styledComponent(Text)`
  ${baseStyles}

  &.has-noUrl {
    opacity: 0.4;
  }
`

export const AttachmentChatUI = styledComponent(Chat)`
  ${baseStyles}
`
