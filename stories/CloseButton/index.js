import React from 'react'
import { storiesOf } from '@storybook/react'
import { CloseButton } from '../../src/index.js'

const stories = storiesOf('CloseButton', module)

stories.add('default', () => (
  <CloseButton />
))

stories.add('seamless', () => (
  <CloseButton seamless />
))

stories.add('sizes', () => (
  <div>
    <CloseButton size='md' /><br />
    <CloseButton size='sm' /><br />
    <CloseButton size='xs' />
  </div>
))
