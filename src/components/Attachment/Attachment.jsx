import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import AttachmentProvider, { AttachmentContext } from './Attachment.Provider'
import IconButton from '../IconButton'
import Truncate from '../Truncate'
import Tooltip from '../Tooltip'
import Icon from '../Icon'
import classNames from 'classnames'
import { AttachmentUI, ImageUI, SizeUI, NameUI } from './Attachment.css'

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
    isRemovable: isRemovableProp,
    size,
    state,
    target,
    theme: themeProp,
    truncateLimit,
    type,
    url,
    ...rest
  } = props

  const [isBrokenImage, setBrokenImage] = useState(false)

  const { theme: themeContext, isRemovable: isRemovableContext } =
    useContext(AttachmentContext) || {}

  const theme = themeContext || themeProp
  const isRemovable = Boolean(isRemovableContext)
    ? isRemovableContext
    : isRemovableProp
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
    isBrokenImage && imageUrl && 'is-broken-image',
    className
  )

  function contentMarkup() {
    if (content) {
      return content
    }
    if (imageUrl && !isBrokenImage) {
      return (
        <ImageUI
          block
          className="c-Attachment__image"
          src={imageUrl}
          alt={name}
          onError={() => setBrokenImage(true)}
        />
      )
    }

    const nameComponent = (
      <NameUI className="c-Attachment__name" lineHeightReset>
        <Truncate limit={truncateLimit} text={name} type="middle">
          {name}
        </Truncate>
      </NameUI>
    )

    const sizeComponent = size && (
      <SizeUI className="c-Attachment__size" lineHeightReset>
        {size}
      </SizeUI>
    )

    if (isBrokenImage) {
      return (
        <>
          <Icon size="24" name="image-broken" />
          {nameComponent}
        </>
      )
    }

    return (
      <>
        {nameComponent}
        {sizeComponent}
      </>
    )
  }

  const shouldShowRemoveIcon = isRemovable && isThemePreview

  const attachmentComponent = (
    <AttachmentUI
      {...getValidProps(rest)}
      className={componentClassName}
      href={url}
      onClick={handleOnClick}
      title={!isBrokenImage ? name : null}
      {...downloadProps}
    >
      {contentMarkup()}
      {shouldShowRemoveIcon && (
        <IconButton
          className="c-Attachment__closeButton"
          onClick={handleOnRemoveClick}
          size="sm"
          title="Remove attachment"
          aria-label="Remove attachment"
          theme="grey"
          icon="cross-small"
        />
      )}
    </AttachmentUI>
  )

  if (isBrokenImage) {
    return (
      <Tooltip
        role="tooltip"
        title="Unavailable image"
        appendTo={() => document.body}
        withTriggerWrapper={false}
      >
        {attachmentComponent}
      </Tooltip>
    )
  }

  return attachmentComponent
}

Attachment.defaultProps = {
  'data-cy': 'Attachment',
  'data-testid': 'Attachment',
  mime: 'image/png',
  name: 'image.png',
  onClick: noop,
  onRemoveClick: noop,
  isRemovable: true,
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
  /** On theme preview, it will display a remove icon when hovering the attachment. */
  isRemovable: PropTypes.bool,
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
  /** Data attr for RTL tests. */
  'data-testid': PropTypes.string,
}

Attachment.Provider = AttachmentProvider
export const Provider = AttachmentProvider
export default Attachment
