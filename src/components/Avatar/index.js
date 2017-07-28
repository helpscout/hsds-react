import React from 'react'
import PropTypes from 'prop-types'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'

const propTypes = {
  className: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string.isRequired,
  size: PropTypes.string
}
const defaultProps = {
  name: ''
}

const Avatar = props => {
  const { image, name, size } = props

  const className = classNames(
    'c-Avatar',
    image && 'has-image',
    size && `is-${size}`,
    props.className
  )

  const initials = nameToInitials(name)
  const imageStyle = image ? { backgroundImage: `url('${image}')` } : null

  const contentMarkup = image
    ? (
      <div className='c-Avatar__image' style={imageStyle}>
        <div className='c-Avatar__name'>
          <VisuallyHidden>
            {name}
          </VisuallyHidden>
        </div>
      </div>
    )
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
