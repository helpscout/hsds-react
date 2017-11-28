import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import {
  default as Avatar,
  propTypes as avatarTypes
} from '../Avatar'
import AnimateGroup from '../AnimateGroup'
import Animate from '../Animate'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  avatars: PropTypes.arrayOf(PropTypes.shape(avatarTypes)),
  max: PropTypes.number,
  shape: avatarTypes.shape,
  size: standardSizeTypes
}

const defaultProps = {
  avatars: [],
  max: 4,
  shape: 'rounded',
  size: 'sm'
}

const AvatarList = props => {
  const {
    avatars,
    className,
    max,
    shape,
    size,
    ...rest
  } = props

  const totalAvatarCount = avatars.length
  const avatarList = max ? avatars.slice(0, max) : avatars
  const additionalAvatarCount = totalAvatarCount - avatarList.length

  const componentClassName = classNames(
    'c-AvatarList',
    'c-List',
    'c-List--inline',
    'c-List--xs',
    className
  )

  const additionalAvatarMarkup = additionalAvatarCount ? (
    <Animate
      key='AvatarList__additionalAvatarMarkup'
      className='c-AvatarList__item c-List__item'
      sequence='fade'
    >
      <Avatar
        count={`+${additionalAvatarCount}`}
        light
        name={`+${additionalAvatarCount}`}
        shape={shape}
        size={size}
      />
    </Animate>
  ) : null

  const avatarMarkup = avatarList.map((avatarProps, index) => {
    return (
      <Animate
        className='c-AvatarList__item c-List__item'
        key={`${avatarProps.name}-${index}`}
        sequence='fade'
      >
        <Avatar shape={shape} size={size} {...avatarProps} />
      </Animate>
    )
  })

  return (
    <AnimateGroup
      className={componentClassName}
      stagger
      staggerDelay={10}
      {...rest}
    >
      {avatarMarkup}
      {additionalAvatarMarkup}
    </AnimateGroup>
  )
}

AvatarList.propTypes = propTypes
AvatarList.defaultProps = defaultProps

export default AvatarList
