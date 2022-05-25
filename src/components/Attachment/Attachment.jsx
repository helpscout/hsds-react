import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import AttachmentProvider from './Attachment.Provider'
import CloseButton from '../CloseButton'
import Image from '../Image'
import Text from '../Text'
import Truncate from '../Truncate'
import classNames from 'classnames'
import { AttachmentUI, ErrorBorderUI } from './Attachment.css'

function noop() {}

export const Provider = AttachmentProvider

export class Attachment extends React.PureComponent {
  static contextTypes = {
    theme: noop,
  }
  static Provider = AttachmentProvider

  getAttachmentProps = () => {
    const { id, imageUrl, mime, name, size, url } = this.props

    return {
      id,
      imageUrl,
      mime,
      name,
      size,
      url,
    }
  }

  isError() {
    return this.props.state === 'error'
  }

  isThemePreview() {
    return this.context.theme === 'preview'
  }

  handleOnClick = event => {
    this.props.onClick(event, this.getAttachmentProps())
  }

  handleOnRemoveClick = event => {
    // prevent from opening a link set on attachment if remove button clicked
    event.preventDefault()
    this.props.onRemoveClick(event, this.getAttachmentProps())
  }

  renderErrorBorder() {
    return (
      this.isError() && (
        <ErrorBorderUI
          className="c-Attachment__errorBorder"
          isCard={this.isThemePreview()}
        />
      )
    )
  }

  render() {
    const {
      children,
      className,
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
      truncateLimit,
      type,
      url,
      content,
      ...rest
    } = this.props
    const { theme } = this.context

    const isThemePreview = this.isThemePreview()

    const componentClassName = classNames(
      'c-Attachment',
      imageUrl && 'has-image',
      state && `is-${state}`,
      type && `is-${type}`,
      theme && `is-theme-${theme}`,
      className
    )

    const sizeMarkup = size ? (
      <Text className="c-Attachment__size" lineHeightReset>
        {size}
      </Text>
    ) : null

    function contentMarkup() {
      if (content) {
        return content
      }
      if (imageUrl) {
        return (
          <Image
            block
            className="c-Attachment__image"
            src={imageUrl}
            alt={name}
          />
        )
      }

      return (
        <>
          <Text className="c-Attachment__name" lineHeightReset>
            <Truncate limit={truncateLimit} text={name} type="middle">
              {name}
            </Truncate>
          </Text>
          {sizeMarkup}
        </>
      )
    }

    const closeMarkup = isThemePreview ? (
      <CloseButton
        className="c-Attachment__closeButton"
        onClick={this.handleOnRemoveClick}
        size="tiny"
        title="Remove"
        aria-label="Remove attachment"
      />
    ) : null

    const downloadProps = {
      download: download !== undefined ? download : url ? true : null,
      target: target !== undefined ? target : url ? '_blank' : '',
    }

    return (
      <AttachmentUI
        {...getValidProps(rest)}
        className={componentClassName}
        href={url}
        onClick={this.handleOnClick}
        title={name}
        {...downloadProps}
      >
        <span className="c-Attachment__content">{contentMarkup()}</span>
        {closeMarkup}
        {this.renderErrorBorder()}
      </AttachmentUI>
    )
  }
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

export default Attachment
