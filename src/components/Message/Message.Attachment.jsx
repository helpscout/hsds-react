import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Link from '../Link'
import Text from '../Text'
import classNames from 'classnames'
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

function noop() {}

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

MessageAttachment.propTypes = {
  body: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines if the file can be downloaded on click. Default `true`. */
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Renders the error caption. Default `false`. */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Customizes the error caption. */
  errorMessage: PropTypes.string,
  /** The name of the file. */
  filename: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.any,
  /** Renders the uploading spinner UI. Default `false`. */
  isUploading: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Callback when the file is clicked. */
  onClick: PropTypes.func,
  /** Opens downloadable links in new tab. Default `true`. */
  openDownloadInNewTab: PropTypes.bool,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Timestamp for the Message. */
  timestamp: PropTypes.string,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.any,
  /** Customizes the uploading message text. */
  uploadingMessage: PropTypes.string,
  /** The URL of the file. */
  url: PropTypes.string,
  /** Applies "note" styles. */
  isNote: PropTypes.bool,
  /** Applies "primary" styles. */
  primary: PropTypes.bool,
  /** Determines the size of the component. */
  size: PropTypes.oneOf(['md', 'sm', '']),
  /** Renders a `Heading` title in the component. */
  title: PropTypes.string,
  /** Renders `TypingDots` within the component. */
  typing: PropTypes.bool,
  type: PropTypes.oneOf(['action', 'message', '']),
  icon: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default MessageAttachment
