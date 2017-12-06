import React from 'react'
import { storiesOf } from '@storybook/react'
import { AvatarList } from '../src/index.js'

const stories = storiesOf('AvatarList', module)

const avatars = [
  {
    name: 'Ron Burgandy'
  },
  {
    name: 'Champ Kind'
  },
  {
    name: 'Brian Fantana'
  },
  {
    name: 'Brick Tamland'
  }
]

export const SampleComponent = () => {
  return (
    <AvatarList avatars={avatars} max={2} />
  )
}

stories.add('default', () => {
  return (
    <SampleComponent />
  )
})

stories.add('limit', () => {
  return (
    <AvatarList avatars={avatars} max={1} size='lg' />
  )
})
