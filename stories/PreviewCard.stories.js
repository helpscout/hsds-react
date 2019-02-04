import React from 'react'
import { storiesOf } from '@storybook/react'
import { PreviewCard } from '../src/index.js'

storiesOf('PreviewCard', module).add('default', () => (
  <PreviewCard title="Preview title">Preview content text</PreviewCard>
))
