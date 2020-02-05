import React from 'react'
import { withKnobs, number, text, select } from '@storybook/addon-knobs'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import { Avatar, AvatarStack } from '../index'

const guides = [
  {
    width: '100%',
    height: '60px',
    top: '50%',
    marginTop: '-30px',
    opacity: 0.1,
  },
]

export default {
  component: AvatarStack,
  title: 'Components/AvatarStack',
}

export const V2Default = () => {
  const avatars = number('avatars', 5)

  const animationDuration = number('animationDuration', 300)
  const animationEasing = text('animationEasing', 'ease')
  const animationSequence = text('animationSequence', 'fade')
  const max = number('max', 5)

  const animation = number('animationDuration', 300)
  const size = select(
    'size',
    {
      default: null,
      xl: 'xl',
      lg: 'lg',
      md: 'md',
      smmd: 'smmd',
      sm: 'sm',
      xs: 'xs',
      xxs: 'xxs',
    },
    null
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

  const avatarsMarkup = [...Array(avatars)].map(() => {
    const avatar = AvatarSpec.generate()
    return <Avatar {...avatar} key={avatar.id} />
  })

  const props = {
    animationDuration,
    animationEasing,
    animationSequence,
    max,
    shape,
    size,
    version: 2,
  }

  return <AvatarStack {...props}>{avatarsMarkup}</AvatarStack>
}

V2Default.story = {
  name: 'V2/Default',
}
