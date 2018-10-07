import { AttachmentProp } from './types'
import * as React from 'react'
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
import css from './styles/Attachment.css.js'

export const Provider = AttachmentProvider

type Props = {
  children?: any
  className?: string
  download: boolean | string
  id: string
  imageUrl: string
  mime: string
  name: string
  onClick: (event: Event, attachmentProp: AttachmentProp) => void
  onRemoveClick: (event: Event, attachmentProp: AttachmentProp) => void
  size: number | string
  target: string
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

  handleOnClick = (event: Event) => {
    this.props.onClick(event, this.getAttachmentProps())
  }

  handleOnRemoveClick = (event: Event) => {
    this.props.onRemoveClick(event, this.getAttachmentProps())
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
      target,
      truncateLimit,
      type,
      url,
      ...rest
    } = this.props
    const { theme } = this.context

    const isThemePreview = theme === 'preview'

    const componentClassName = classNames(
      'c-Attachment',
      imageUrl && 'has-image',
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
      target: target !== undefined ? target : url ? '_blank' : null,
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
      </a>
    )
  }
}

const StyledAttachment = styled(Attachment)(css)

namespaceComponent(COMPONENT_KEY)(StyledAttachment)

export default StyledAttachment
