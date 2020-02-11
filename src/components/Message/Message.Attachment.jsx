import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { TextUI } from './Message.css'
import MessageChat from './Message.Chat'

export const Attachment = (props, context) => {
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

Attachment.propTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  errorMessage: PropTypes.string,
  filename: PropTypes.string,
  from: PropTypes.any,
  icon: PropTypes.string,
  isNote: PropTypes.bool,
  isNote: PropTypes.bool,
  isUploading: PropTypes.boolean,
  ltr: PropTypes.bool,
  onClick: PropTypes.func,
  onClick: PropTypes.func,
  openDownloadInNewTab: PropTypes.bool,
  primary: PropTypes.bool,
  read: PropTypes.bool,
  rtl: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'sm', '']),
  timestamp: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.any,
  type: PropTypes.oneOf(['action', 'message', '']),
  typing: PropTypes.bool,
  uploadingMessage: PropTypes.string,
  url: PropTypes.string,
}

Attachment.defaultProps = {
  download: true,
  onClick: noop,
  openDownloadInNewTab: true,
  isUploading: false,
  size: 'md',
  uploadingMessage: 'Uploading…',
}

Attachment.contextTypes = {
  theme: noop,
}

Attachment.displayName = 'MessageAttachment'

export default Attachment
