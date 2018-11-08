import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { CopyButton } from '../src/index.js'

const stories = storiesOf('CopyButton', module)

stories.add('Default', () => (
  <CopyButton onClick={action('Click')} onReset={action('Reset')} />
))

stories.add('Text', () => (
  <CopyButton
    onClick={action('Click')}
    onReset={action('Reset')}
    kind="secondary"
    size="sm"
  >
    Copy
  </CopyButton>
))
