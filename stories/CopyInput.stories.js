import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CopyInput } from '../src/index'

const stories = storiesOf('CopyInput', module)

stories.add('Default', () => (
  <CopyInput autoFocus={true} value="testing" onCopy={action('Copy')} />
))

stories.add('Read-only', () => (
  <CopyInput value="secretkey" onCopy={action('Copy')} readOnly />
))
