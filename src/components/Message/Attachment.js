import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Text from '../Text'
import Chat from './Chat'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { bubbleTypes, providerContextTypes } from './propTypes'

export const propTypes = Object.assign({}, bubbleTypes, {
  errorMessage: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  filename: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isUploading: PropTypes.bool,
  onClick: PropTypes.func,
  openDownloadInNewTab: PropTypes.bool,
  uploadingMessage: PropTypes.string,
})

const defaultProps = {
  download: true,
  onClick: noop,
  openDownloadInNewTab: true,
  isUploading: false,
  uploadingMessage: 'Uploading…',
}

const contextTypes = providerContextTypes

const Attachment = (props, context) => {
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

  const title = download ? `Download ${filename}` : null

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

Attachment.propTypes = propTypes
Attachment.defaultProps = defaultProps
Attachment.contextTypes = contextTypes

export default Attachment
