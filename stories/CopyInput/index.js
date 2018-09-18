import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { CopyInput } from '../../src/index.js'

const stories = storiesOf('CopyInput', module)

stories.add('Default', () => (
  <CopyInput onClick={action('Click')} onReset={action('Reset')} />
))
