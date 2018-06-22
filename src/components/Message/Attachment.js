// @flow
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Text from '../Text'
import Chat from './Chat'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { bubbleTypes, providerContextTypes } from './propTypes'
import type { MessageBubble, MessageThemeContext } from './types'

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

const Attachment = (props: Props, context: Context) => {
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
    uploadingMessage,
    url,
    type,
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
    <Text className={textClassName} truncate>
      {filename}
    </Text>
  )

  return (
    <Chat
      {...rest}
      bubbleClassName="c-MessageMedia__bubble"
      caption={isUploading ? uploadingMessage : null}
      className={componentClassName}
      icon="attachment"
      isLoading={isUploading}
      size="sm"
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
  uploadingMessage: 'Uploading…',
}
Attachment.contextTypes = providerContextTypes
Attachment.displayName = 'Message.Attachment'

export default Attachment
