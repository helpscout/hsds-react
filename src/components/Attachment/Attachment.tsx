import { AttachmentProp } from './types'
import * as React from 'react'
import { UIState } from '../../constants/types.js'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import AttachmentProvider from './Provider'
import CloseButton from '../CloseButton'
import Image from '../Image'
import Text from '../Text'
import Truncate from '../Truncate'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './utils'
import css, { ErrorBorderUI } from './Attachment.css.js'

export const Provider = AttachmentProvider

export type MouseClickEvent = React.MouseEvent<HTMLAnchorElement>

export interface Props {
  children?: any
  className?: string
  download?: any
  id: string
  imageUrl: string
  mime: string
  name: string
  onClick: (event: MouseClickEvent, attachmentProp: AttachmentProp) => void
  onRemoveClick: (event: Event, attachmentProp: AttachmentProp) => void
  state: UIState
  size: number | string
  target?: string
  truncateLimit: number
  type: 'action' | 'link'
  url: string
}

export class Attachment extends React.PureComponent<Props> {
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

  getAttachmentProps = (): AttachmentProp => {
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

  handleOnClick = (event: MouseClickEvent) => {
    this.props.onClick(event, this.getAttachmentProps())
  }

  handleOnRemoveClick = (event: Event) => {
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
      <a
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
      </a>
    )
  }
}

const StyledAttachment = styled(Attachment)(css)

namespaceComponent(COMPONENT_KEY)(StyledAttachment)

export default StyledAttachment
