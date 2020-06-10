import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Link from '../Link'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { TextUI } from './Message.css'
import MessageChat from './Message.Chat'

export const MessageAttachment = (props, context) => {
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
      {...getValidProps(rest)}
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

MessageAttachment.propTypes = {
  body: PropTypes.string,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  errorMessage: PropTypes.string,
  filename: PropTypes.string,
  from: PropTypes.any,
  icon: PropTypes.string,
  isNote: PropTypes.bool,
  isUploading: PropTypes.bool,
  ltr: PropTypes.bool,
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

MessageAttachment.defaultProps = {
  'data-cy': 'MessageAttachment',
  download: true,
  onClick: noop,
  openDownloadInNewTab: true,
  isUploading: false,
  size: 'md',
  uploadingMessage: 'Uploading…',
}

MessageAttachment.contextTypes = {
  theme: noop,
}

export default MessageAttachment
