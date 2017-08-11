import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar } from '../src/index.js'

storiesOf('Avatar', module)
  .add('default', () => (
    <Avatar name='Ron Burgundy' image='https://media3.giphy.com/media/hUXSFaQ1zyiE8/200_s.gif' />
  ))
  .add('initials', () => (
    <Avatar name='Ron Burgundy' />
  ))
  .add('sizes', () => (
    <div>
      <Avatar name='Ron Burgundy' size='lg' />
      <Avatar name='Ron Burgundy' size='md' />
      <Avatar name='Ron Burgundy' size='sm' />
    </div>
  ))
