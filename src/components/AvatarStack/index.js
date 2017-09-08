import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import {
  default as Avatar,
  propTypes as avatarTypes,
} from '../Avatar'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  avatars: PropTypes.arrayOf(PropTypes.shape(avatarTypes)),
  borderColor: PropTypes.string,
  max: PropTypes.number,
  size: standardSizeTypes
}

const defaultProps = {
  avatars: [],
  borderColor: 'white',
  max: 4
}

const AvatarStack = props => {
  const {
    avatars,
    borderColor,
    className,
    max,
    size,
    ...rest
  } = props

  const totalAvatarCount = avatars.length
  const avatarList = max ? avatars.slice(0, max) : avatars
  const additionalAvatarCount = totalAvatarCount - avatarList.length

  const componentClassName = classNames(
    'c-AvatarStack',
    className
  )

  const additionalAvatarMarkup = additionalAvatarCount ? (
    <div className='c-AvatarStack__item'>
      <Avatar
        borderColor={borderColor}
        size={size}
        name={`+${additionalAvatarCount}`}
        count={`+${additionalAvatarCount}`}
      />
    </div>
  ) : null

  const avatarMarkup = avatarList.map((avatarProps, index) => {
    const zIndex = (avatarList.length - index) + 1

    return (
      <div className='c-AvatarStack__item' style={{zIndex}} key={`${avatarProps.name}-${index}`}>
        <Avatar borderColor={borderColor} size={size} {...avatarProps} />
      </div>
    )
  })

  return (
    <div className={componentClassName} {...rest}>
      {avatarMarkup}
      {additionalAvatarMarkup}
    </div>
  )
}

AvatarStack.propTypes = propTypes
AvatarStack.defaultProps = defaultProps

export default AvatarStack
