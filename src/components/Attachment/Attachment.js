// @flow
import React, { PureComponent as Component } from 'react'
import AttachmentProvider from './Provider'
import CloseButton from '../CloseButton'
import Image from '../Image'
import Text from '../Text'
import Truncate, { getTruncatedContent } from '../Truncate'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { providerContextTypes } from './propTypes'
import css from './styles/Attachment.css.js'
import type { AttachmentProp } from './types'

export const Provider = AttachmentProvider

type Props = {
  children?: any,
  className?: string,
  download: boolean | string,
  id: number | string,
  imageUrl: string,
  mime: string,
  name: string,
  onClick: (event: Event, attachmentProp: AttachmentProp) => void,
  onRemoveClick: (event: Event, attachmentProp: AttachmentProp) => void,
  size: number | string,
  target: string,
  truncateLimit: number,
  type: 'action' | 'link',
  url: string,
}

export class Attachment extends Component<Props> {
  static defaultProps = {
    mime: 'image/png',
    name: 'image.png',
    onClick: noop,
    onRemoveClick: noop,
    truncateLimit: 20,
    type: 'link',
  }
  static contextTypes = providerContextTypes
  static Provider = AttachmentProvider

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

    const attachmentProps = {
      id,
      imageUrl,
      mime,
      name,
      size,
      url,
    }

    const handleOnClick = (event: Event) => {
      onClick(event, attachmentProps)
    }

    const handleOnRemoveClick = (event: Event) => {
      onRemoveClick(event, attachmentProps)
    }

    const isTruncated =
      getTruncatedContent({
        ellipsis: '...',
        limit: truncateLimit,
        type: 'middle',
        text: name,
      }) !== name

    const tooltipName = imageUrl ? name : isTruncated ? name : ''

    const tooltipProps = {
      title: name,
      modifiers: {
        preventOverflow: {
          boundariesElement: window,
        },
      },
      placement: 'top',
    }

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
        onClick={handleOnRemoveClick}
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
        className={componentClassName}
        href={url}
        onClick={handleOnClick}
        title={name}
        {...downloadProps}
        {...rest}
      >
        {contentMarkup}
        {closeMarkup}
      </a>
    )
  }
}

export default styled(Attachment)(css)
