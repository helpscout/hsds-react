import React from 'react'
import { PreviewCard } from '../index'

export default {
  component: PreviewCard,
  title: 'Components/PreviewCard',
}

export const Default = () => (
  <PreviewCard title="Preview title">Preview content text</PreviewCard>
)

Default.story = {
  name: 'default',
}
