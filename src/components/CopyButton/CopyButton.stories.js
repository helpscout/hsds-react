import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { CopyButton } from '../index'

const stories = storiesOf('Components/CopyButton', module)

stories.add('Default', () => (
  <CopyButton onClick={action('Click')} onReset={action('Reset')} />
))
