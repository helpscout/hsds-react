import React from 'react'
import types from './types'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'

const propTypes = types
const defaultProps = {
  name: ''
}

const Avatar = props => {
  const { borderColor, count, image, name, size } = props

  const className = classNames(
    'c-Avatar',
    image && 'has-image',
    size && `is-${size}`,
    props.className
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
    <div className={className}>
      <div className='c-Avatar__crop' style={styles}>
        {contentMarkup}
      </div>
    </div>
  )
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

export default Avatar
