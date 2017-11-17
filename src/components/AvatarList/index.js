import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import {
  default as Avatar,
  propTypes as avatarTypes
} from '../Avatar'
import AnimateGroup from '../AnimateGroup'
import Animate from '../Animate'
import List from '../List'
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
    className
  )

  const additionalAvatarMarkup = additionalAvatarCount ? (
    <Animate
      key='AvatarList__additionalAvatarMarkup'
      sequence='fadeIn'
    >
      <List.Item className='c-AvatarList__item'>
        <Avatar
          count={`+${additionalAvatarCount}`}
          light
          name={`+${additionalAvatarCount}`}
          shape={shape}
          size={size}
        />
      </List.Item>
    </Animate>
  ) : null

  const avatarMarkup = avatarList.map((avatarProps, index) => {
    return (
      <Animate
        key={`${avatarProps.name}-${index}`}
        sequence='fadeIn'
      >
        <List.Item className='c-AvatarList__item'>
          <Avatar shape={shape} size={size} {...avatarProps} />
        </List.Item>
      </Animate>
    )
  })

  return (
    <List
      className={componentClassName}
      type='inline'
      size='xs'
      {...rest}
    >
      <AnimateGroup stagger staggerDelay={10}>
        {avatarMarkup}
        {additionalAvatarMarkup}
      </AnimateGroup>
    </List>
  )
}

AvatarList.propTypes = propTypes
AvatarList.defaultProps = defaultProps

export default AvatarList
