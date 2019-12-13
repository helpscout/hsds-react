import * as React from 'react'
import { MessageBubble, MessageThemeContext } from './Message.types'
import Link from '../Link'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { AttachmentChatUI, TextUI } from './styles/Attachment.css'
import MessageChat from './Message.Chat'

type Props = MessageBubble & {
  errorMessage?: string
  error?: boolean | string
  filename?: string
  download?: boolean | string
  isUploading?: boolean
  onClick?: (event?: Event) => void
  openDownloadInNewTab?: boolean
  uploadingMessage?: string
  url?: string
}
type Context = MessageThemeContext

export const Attachment = (props: Props, context: Context) => {
  const {
    body,
    children,
    className,
    download,
    filename,
    isUploading,
    onClick,
    openDownloadInNewTab,
    size,
    type,
    uploadingMessage,
    url,
    ...rest
  } = props
  const { theme } = context

  const componentClassName = classNames(
    'c-MessageAttachment',
    !url && 'has-noUrl',
    theme && `is-theme-${theme}`,
    className
  )
  const textClassName = classNames(
    'c-MessageAttachment__text',
    !url && 'has-noUrl'
  )

  const title = download && filename ? `Download ${filename}` : null

  const filenameMarkup = url ? (
    <Link
      className="c-MessageAttachment__link"
      download={download}
      href={url}
      onClick={onClick}
      target={openDownloadInNewTab ? '_blank' : null}
      title={title}
    >
      <Text truncate className="c-MessageAttachment__linkText">
        {filename}
      </Text>
    </Link>
  ) : (
    <TextUI className={textClassName} truncate>
      {filename}
    </TextUI>
  )

  return (
    <MessageChat
      {...rest}
      bubbleClassName="c-MessageMedia__bubble"
      caption={isUploading ? uploadingMessage : null}
      className={componentClassName}
      icon="attachment"
      isLoading={isUploading}
      size={size}
    >
      {filenameMarkup}
    </MessageChat>
  )
}

Attachment.defaultProps = {
  download: true,
  onClick: noop,
  openDownloadInNewTab: true,
  isUploading: false,
  size: 'md',
  uploadingMessage: 'Uploading…',
}

// TODO: fix typescript complains
// @ts-ignore
Attachment.contextTypes = {
  theme: noop,
}

Attachment.displayName = 'MessageAttachment'

export default Attachment
