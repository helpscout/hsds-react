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
import { Avatar } from '../../src/index.js'
import AvatarSpec from './specs/Avatar'

const guides = []

const stories = storiesOf('Avatar', module)
stories.addDecorator(
  withArtboard({ id: 'hsds-avatar', guides, width: 300, height: 160 })
)
stories.addDecorator(withKnobs)

stories.add('V2/Default', () => {
  const animationDuration = number('animationDuration', 160)
  const animationEasing = text('animationEasing', 'ease')

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
    shape,
    size,
    status,
    version: 2,
  }

  return <Avatar {...props} />
})
