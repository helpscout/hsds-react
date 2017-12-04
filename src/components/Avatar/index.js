import React from 'react'
import PropTypes from 'prop-types'
import StatusDot from '../StatusDot'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { statusTypes } from '../StatusDot/propTypes'
import { nameToInitials } from '../../utilities/strings'
import { standardSizeTypes } from '../../constants/propTypes'
import { shapeTypes } from './propTypes'

export const propTypes = {
  borderColor: PropTypes.string,
  className: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  initials: PropTypes.string,
  light: PropTypes.bool,
  name: PropTypes.string.isRequired,
  shape: shapeTypes,
  size: standardSizeTypes,
  statusIcon: PropTypes.string,
  status: statusTypes
}

const defaultProps = {
  light: false,
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
    light,
    initials,
    size,
    shape,
    status,
    statusIcon,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Avatar',
    image && 'has-image',
    light && 'is-light',
    shape && `is-${shape}`,
    size && `is-${size}`,
    status && `is-${status}`,
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

  const statusMarkup = status ? (
    <div className='c-Avatar__status'>
      <StatusDot status={status} icon={statusIcon} />
    </div>
  ) : null

  return (
    <div className={componentClassName} title={name} {...rest}>
      <div className='c-Avatar__crop' style={styles}>
        {contentMarkup}
      </div>
      {statusMarkup}
    </div>
  )
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

export default Avatar
