import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Avatar from '../Avatar'
import avatarTypes from '../Avatar/types'

const propTypes = {
  avatars: PropTypes.arrayOf(PropTypes.shape(avatarTypes)),
  borderColor: PropTypes.string,
  max: PropTypes.number,
  size: PropTypes.string
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
    max,
    size
  } = props

  const totalAvatarCount = avatars.length
  const avatarList = max ? avatars.slice(0, max) : avatars
  const additionalAvatarCount = totalAvatarCount - avatarList.length

  const className = classNames(
    'c-AvatarStack',
    props.className
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
    <div className={className}>
      {avatarMarkup}
      {additionalAvatarMarkup}
    </div>
  )
}

AvatarStack.propTypes = propTypes
AvatarStack.defaultProps = defaultProps

export default AvatarStack
