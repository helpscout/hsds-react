import React from 'react'
import PropTypes from 'prop-types'
import Provider from './Provider'
import CloseButton from '../CloseButton'
import Image from '../Image'
import Text from '../Text'
import Truncate from '../Truncate'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { providerContextTypes } from './propTypes'

export const propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageUrl: PropTypes.string,
  mime: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  truncateLimit: PropTypes.number,
  type: PropTypes.oneOf([
    'action',
    'link'
  ]),
  url: PropTypes.string
}

const defaultProps = {
  mime: 'image/png',
  name: 'image.png',
  onClick: noop,
  onRemoveClick: noop,
  truncateLimit: 30,
  type: 'link'
}

const contextTypes = providerContextTypes

const Attachment = (props, context) => {
  const {
    children,
    className,
    id,
    imageUrl,
    mime,
    name,
    onClick,
    onRemoveClick,
    size,
    truncateLimit,
    type,
    url,
    ...rest
  } = props
  const {
    theme
  } = context

  const isThemePreview = theme === 'preview'

  const attachmentProps = {
    id,
    imageUrl,
    mime,
    name,
    size,
    url
  }

  const handleOnClick = (event) => {
    onClick(event, attachmentProps)
  }

  const handleOnRemoveClick = (event) => {
    onRemoveClick(event, attachmentProps)
  }

  const componentClassName = classNames(
    'c-Attachment',
    imageUrl && 'has-image',
    type && `is-${type}`,
    theme && `is-theme-${theme}`,
    className
  )

  const sizeMarkup = size ? (
    <Text className='c-Attachment__size' lineHeightReset>
      {size}
    </Text>
  ) : null

  const contentMarkup = imageUrl ? (
    <span className='c-Attachment__content'>
      <Image
        block
        className='c-Attachment__image'
        src={imageUrl}
      />
    </span>
  ) : (
    <span className='c-Attachment__content'>
      <Text className='c-Attachment__name' lineHeightReset>
        <Truncate limit={truncateLimit} type='middle'>{name}</Truncate>
      </Text>
      {sizeMarkup}
    </span>
  )

  const closeMarkup = isThemePreview ? (
    <CloseButton
      className='c-Attachment__closeButton'
      onClick={handleOnRemoveClick}
      size='tiny'
      title='Remove'
    />
  ) : null

  return (
    <a
      className={componentClassName}
      href={url}
      onClick={handleOnClick}
      {...rest}
    >
      {contentMarkup}
      {closeMarkup}
    </a>
  )
}

Attachment.propTypes = propTypes
Attachment.defaultProps = defaultProps
Attachment.contextTypes = contextTypes
Attachment.displayName = 'Attachment'
Attachment.Provider = Provider

export default Attachment
