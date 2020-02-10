import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import AttachmentProvider from './Attachment.Provider'
import CloseButton from '../CloseButton'
import Image from '../Image'
import Text from '../Text'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { AttachmentUI, ErrorBorderUI } from './Attachment.css'

export const Provider = AttachmentProvider

export class Attachment extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    download: PropTypes.any,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    mime: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onRemoveClick: PropTypes.func,
    state: PropTypes.string,
    size: PropTypes.oneOfTypes([PropTypes.string, PropTypes.number]),
    target: PropTypes.string,
    truncateLimit: PropTypes.number,
    type: PropTypes.oneOf(['action', 'link']),
    url: PropTypes.string,
  }

  static defaultProps = {
    mime: 'image/png',
    name: 'image.png',
    onClick: noop,
    onRemoveClick: noop,
    truncateLimit: 20,
    state: 'default',
    type: 'link',
  }
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

    const contentMarkup = imageUrl ? (
      <span className="c-Attachment__content">
        <Image
          block
          className="c-Attachment__image"
          src={imageUrl}
          alt={name}
        />
      </span>
    ) : (
      <span className="c-Attachment__content">
        <Text className="c-Attachment__name" lineHeightReset>
          <Truncate limit={truncateLimit} text={name} type="middle">
            {name}
          </Truncate>
        </Text>
        {sizeMarkup}
      </span>
    )

    const closeMarkup = isThemePreview ? (
      <CloseButton
        className="c-Attachment__closeButton"
        onClick={this.handleOnRemoveClick}
        size="tiny"
        title="Remove"
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
        {contentMarkup}
        {closeMarkup}
        {this.renderErrorBorder()}
      </AttachmentUI>
    )
  }
}

export default Attachment
