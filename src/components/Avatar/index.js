import React from 'react'
import PropTypes from 'prop-types'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'

export const propTypes = {
  borderColor: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string.isRequired,
  size: PropTypes.string
}

const defaultProps = {
  name: ''
}

const Avatar = props => {
  const {
    borderColor,
    className,
    count,
    image,
    name,
    size,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Avatar',
    image && 'has-image',
    size && `is-${size}`,
    className
  )

  const initials = nameToInitials(name)
  const imageStyle = image ? { backgroundImage: `url('${image}')` } : null

  const text = count || initials

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
      {text}
    </div>

  const styles = borderColor ? {
    border: '2px solid',
    borderColor
  } : null

  return (
    <div className={componentClassName} {...rest}>
      <div className='c-Avatar__crop' style={styles}>
        {contentMarkup}
      </div>
    </div>
  )
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

export default Avatar
