import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar } from '../../src/index.js'
import AvatarSpec from './specs/Avatar'

const stories = storiesOf('Avatar', module)
const fixture = AvatarSpec.generate()

stories.add('default', () => (
  <Avatar name={fixture.name} image={fixture.image} />
))

stories.add('initials', () => (
  <Avatar name={fixture.name} />
))

stories.add('sizes', () => (
  <div>
    <Avatar name={fixture.name} size='lg' />
    <Avatar name={fixture.name} size='md' />
    <Avatar name={fixture.name} size='sm' />
  </div>
))

stories.add('border', () => (
  <div>
    <Avatar name={fixture.name} size='lg' borderColor='red' />
  </div>
))
