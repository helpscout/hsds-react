import React from 'react'
import { storiesOf } from '@storybook/react'
import { Badge } from '../src/index.js'

const stories = storiesOf('Badge', module)

stories.add('default', () => <Badge>Badger</Badge>)

stories.add('status', () => (
  <div>
    <Badge status='error'>Badger</Badge><br />
    <Badge status='info'>Badger</Badge><br />
    <Badge status='success'>Badger</Badge><br />
    <Badge status='warning'>Badger</Badge><br />
  </div>
))

stories.add('styles', () => (
  <div>
    <Badge>Regular</Badge><br />
    <Badge white>White</Badge><br />
  </div>
))

stories.add('size', () => (
  <div>
    <Badge size='md'>Regular</Badge><br />
    <Badge size='sm'>Small</Badge><br />
  </div>
))
