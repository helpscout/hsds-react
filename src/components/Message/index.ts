import Message from './Message'
import { propConnect } from '../PropProvider'
export { default as Provider } from './Message.Provider'

Message.Action = propConnect('MessageAction')(Message.Action)
Message.Attachment = propConnect('MessageAttachment')(Message.Attachment)
Message.Bubble = propConnect('MessageBubble')(Message.Bubble)
Message.Caption = propConnect('MessageCaption')(Message.Caption)
Message.Chat = propConnect('MessageChat')(Message.Chat)
Message.Content = propConnect('MessageContent')(Message.Content)
Message.Embed = propConnect('MessageEmbed')(Message.Embed)
Message.Media = propConnect('MessageMedia')(Message.Media)
Message.Provider = propConnect('MessageProvider')(Message.Provider)
Message.Question = propConnect('MessageQuestion')(Message.Question)

export default propConnect('Message')(Message)
