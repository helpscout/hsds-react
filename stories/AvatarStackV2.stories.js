import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard, Guide, GuideContainer } from '@helpscout/artboard'
import { Avatar, AvatarStack } from '../src/index'
import AvatarSpec from './Avatar/specs/Avatar'

const guides = [
  {
    width: '100%',
    height: '60px',
    top: '50%',
    marginTop: '-30px',
    opacity: 0.1,
  },
]

const stories = storiesOf('AvatarStack', module)
stories.addDecorator(
  withArtboard({
    guides,
    width: 400,
    height: 100,
    showGuides: false,
    showInterface: false,
  })
)
stories.addDecorator(withKnobs)

stories.add('V2/Default', () => {
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
})
