import React from 'react'
import { boolean, number, text, select } from '@storybook/addon-knobs'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import { Avatar } from '../index'

export default {
  component: Avatar,
  title: 'Components/Badges/Avatar',
}

export const V2Default = () => {
  const animationDuration = number('animationDuration', 160)
  const animationEasing = text('animationEasing', 'ease')

  const image = boolean('image')
  const size = select(
    'size',
    {
      xl: 'xl',
      lg: 'lg',
      md: 'md',
      smmd: 'smmd',
      sm: 'sm',
      xs: 'xs',
      xxs: 'xxs',
    },
    'xl'
  )

  const shape = select(
    'shape',
    {
      square: 'square',
      rounded: 'rounded',
      circle: 'circle',
    },
    'circle'
  )

  const status = select(
    'status',
    {
      default: null,
      online: 'online',
      busy: 'busy',
      inactive: 'inactive',
      offline: 'offline',
    },
    null
  )

  const props = {
    ...AvatarSpec.generate(),
    animationDuration,
    animationEasing,
    image: image ? AvatarSpec.generate().image : null,
    shape,
    size,
    status,
    version: 2,
  }

  return <Avatar {...props} />
}

V2Default.story = {
  name: 'V2/Default',
}
