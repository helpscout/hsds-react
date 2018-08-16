// @flow
import type { MessageBubble, MessageThemeContext } from './types'
import React from 'react'
import Link from '../Link'
import Text from '../Text'
import Chat from './Chat'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { providerContextTypes } from './propTypes'
import css, { TextCSS } from './styles/Attachment.css.js'
import { COMPONENT_KEY } from './utils'

type Props = MessageBubble & {
  errorMessage?: string,
  error?: boolean | string,
  filename?: string,
  download?: boolean | string,
  isUploading?: boolean,
  onClick?: (event?: Event) => void,
  openDownloadInNewTab?: boolean,
  uploadingMessage?: string,
  url?: string,
}
type Context = MessageThemeContext

const MessageAttachmentText = styled(Text)(TextCSS)

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
    <MessageAttachmentText className={textClassName} truncate>
      {filename}
    </MessageAttachmentText>
  )

  return (
    <Chat
      {...rest}
      bubbleClassName="c-MessageMedia__bubble"
      caption={isUploading ? uploadingMessage : null}
      className={componentClassName}
      icon="attachment"
      isLoading={isUploading}
      size={size}
    >
      {filenameMarkup}
    </Chat>
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
Attachment.contextTypes = providerContextTypes

namespaceComponent(COMPONENT_KEY.Attachment)(Attachment)

export default styled(Attachment)(css)
