import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import Truncate from '../Truncate'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mime: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
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
  truncateLimit: 30,
  type: 'link'
}

const Attachment = props => {
  const {
    children,
    className,
    id,
    mime,
    name,
    onClick,
    size,
    truncateLimit,
    type,
    url,
    ...rest
  } = props

  const handleOnClick = (event) => {
    const attachmentProps = {
      id,
      mime,
      name,
      size,
      url
    }
    onClick(event, attachmentProps)
  }

  const componentClassName = classNames(
    'c-Attachment',
    type && `is-${type}`,
    className
  )

  const sizeMarkup = size ? (
    <Text className='c-Attachment__size' lineHeightReset>
      {size}
    </Text>
  ) : null

  return (
    <a
      className={componentClassName}
      href={url}
      onClick={handleOnClick}
      {...rest}
    >
      <Text className='c-Attachment__name' lineHeightReset>
        <Truncate limit={truncateLimit} type='middle'>{name}</Truncate>
      </Text>
      {sizeMarkup}
    </a>
  )
}

Attachment.propTypes = propTypes
Attachment.defaultProps = defaultProps

export default Attachment
