import React from 'react'
import { storiesOf } from '@storybook/react'
import { AvatarStack } from '../src/index.js'

storiesOf('AvatarStack', module)
  .add('default', () => {
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

    return (
      <AvatarStack avatars={avatars} />
    )
  })
  .add('limit', () => {
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

    return (
      <AvatarStack avatars={avatars} max={1} size='lg' />
    )
  })
