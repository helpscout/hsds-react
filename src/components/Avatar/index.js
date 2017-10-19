import React from 'react'
import PropTypes from 'prop-types'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'
import { standardSizeTypes } from '../../constants/propTypes'
import { shapeTypes } from './propTypes'

export const propTypes = {
  borderColor: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string.isRequired,
  initials: PropTypes.string,
  size: standardSizeTypes,
  shape: shapeTypes
}

const defaultProps = {
  name: '',
  shape: 'circle'
}

const Avatar = props => {
  const {
    borderColor,
    className,
    count,
    image,
    name,
    initials,
    size,
    shape,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Avatar',
    image && 'has-image',
    shape && `is-${shape}`,
    size && `is-${size}`,
    className
  )

  const imageStyle = image ? { backgroundImage: `url('${image}')` } : null

  const text = count || initials || nameToInitials(name)

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
    <div className={componentClassName} title={name} {...rest}>
      <div className='c-Avatar__crop' style={styles}>
        {contentMarkup}
      </div>
    </div>
  )
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

export default Avatar
