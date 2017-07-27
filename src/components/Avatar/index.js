import React from 'react'
import PropTypes from 'prop-types'
import Image from '../Image'
import classNames from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'

const propTypes = {
  className: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  title: PropTypes.string
}
const defaultProps = {
  image: false,
  name: '',
  title: '',
}

const Avatar = props => {
  const { image, name, size, title } = props

  const className = classNames(
    'c-Avatar',
    image && 'has-image',
    size && `is-${size}`,
    props.className
  )

  const imageTitle = title ? title : name;

  const imageProps = {
    alt: imageTitle,
    className: 'c-Avatar__photo',
    src: image,
    title: imageTitle,
  }

  const initials = nameToInitials(name)

  const contentMarkup = image
    ? <div className='c-Avatar__image'>
      <Image {...imageProps} />
    </div>
    : <div className='c-Avatar__title'>
      {initials}
    </div>

  return (
    <div className={className}>
      <div className='c-Avatar__crop'>
        {contentMarkup}
      </div>
    </div>
  )
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

export default Avatar
