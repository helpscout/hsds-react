import React from 'react'
import { PreviewCard } from '../index'

export default {
  component: PreviewCard,
  title: 'Components/Structural/PreviewCard',
}

export const Default = () => (
  <PreviewCard title="Preview title">Preview content text</PreviewCard>
)

Default.story = {
  name: 'default',
}
