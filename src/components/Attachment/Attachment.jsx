import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import AttachmentProvider, { AttachmentContext } from './Attachment.Provider'
import CloseButton from '../CloseButton'
import Truncate from '../Truncate'
import classNames from 'classnames'
import {
  AttachmentUI,
  ImageUI,
  SizeUI,
  NameUI,
  ErrorBorderUI,
} from './Attachment.css'

function noop() {}

const Attachment = props => {
  const {
    children,
    className,
    content,
    download,
    id,
    imageUrl,
    mime,
    name,
    onClick,
    onRemoveClick,
    size,
    state,
    target,
    theme: themeProp,
    truncateLimit,
    type,
    url,
    ...rest
  } = props

  const { theme: themeContext } = useContext(AttachmentContext) || {}

  const theme = themeContext || themeProp
  const isThemePreview = theme === 'preview'

  const attachmentProps = {
    id,
    imageUrl,
    mime,
    name,
    size,
    url,
  }

  const handleOnClick = event => {
    onClick && onClick(event, attachmentProps)
  }

  const handleOnRemoveClick = event => {
    // prevent from opening a link set on attachment if remove button clicked
    event.preventDefault()
    onRemoveClick && onRemoveClick(event, attachmentProps)
  }

  const downloadProps = {
    download: download !== undefined ? download : url ? true : null,
    target: target !== undefined ? target : url ? '_blank' : '',
  }

  const componentClassName = classNames(
    'c-Attachment',
    imageUrl && 'has-image',
    state && `is-${state}`,
    type && `is-${type}`,
    theme && `is-theme-${theme}`,
    className
  )

  function contentMarkup() {
    if (content) {
      return content
    }
    if (imageUrl) {
      return (
        <ImageUI
          block
          className="c-Attachment__image"
          src={imageUrl}
          alt={name}
        />
      )
    }

    return (
      <>
        <NameUI className="c-Attachment__name" lineHeightReset>
          <Truncate limit={truncateLimit} text={name} type="middle">
            {name}
          </Truncate>
        </NameUI>
        {size && (
          <SizeUI className="c-Attachment__size" lineHeightReset>
            {size}
          </SizeUI>
        )}
      </>
    )
  }

  return (
    <AttachmentUI
      {...getValidProps(rest)}
      className={componentClassName}
      href={url}
      onClick={handleOnClick}
      title={name}
      {...downloadProps}
    >
      <span className="c-Attachment__content">{contentMarkup()}</span>
      {isThemePreview && (
        <CloseButton
          className="c-Attachment__closeButton"
          onClick={handleOnRemoveClick}
          size="tiny"
          title="Remove"
          aria-label="Remove attachment"
        />
      )}
    </AttachmentUI>
  )
}

Attachment.defaultProps = {
  'data-cy': 'Attachment',
  mime: 'image/png',
  name: 'image.png',
  onClick: noop,
  onRemoveClick: noop,
  truncateLimit: 20,
  state: 'default',
  type: 'link',
}

Attachment.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables file downloaded. Allowed by default if `url` is provided. */
  download: PropTypes.any,
  /** The id of the attachment. */
  id: PropTypes.string,
  /** The URL of the an image attachment to render. */
  imageUrl: PropTypes.string,
  /** The file type of the attachment. */
  mime: PropTypes.string,
  /** The name of the attachment. */
  name: PropTypes.string,
  /** The callback when the component is clicked. */
  onClick: PropTypes.func,
  /** The callback when the component's `CloseButton` UI is clicked. */
  onRemoveClick: PropTypes.func,
  /** The size of the attachment. */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The state of the attachment. */
  state: PropTypes.string,
  /** Determines the link target. Set to `_blank` by default if `url` is provided. */
  target: PropTypes.string,
  /** The amount of characters to truncate the file name. */
  truncateLimit: PropTypes.number,
  /** The type of UI for the component. */
  type: PropTypes.oneOf(['action', 'link']),
  /** The URL of the attachment. */
  url: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

Attachment.Provider = AttachmentProvider
export const Provider = AttachmentProvider
export default Attachment
