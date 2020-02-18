import React from 'react'
import { ProgressBar } from '../index'

export default {
  component: ProgressBar,
  title: 'Components/Elements/ProgressBar',
}

export const Default = () => <ProgressBar value={50} />

Default.story = {
  name: 'default',
}

export const Sizes = () => (
  <div>
    <ProgressBar value={50} size="lg" />
    <br />
    <ProgressBar value={50} size="md" />
    <br />
    <ProgressBar value={50} size="sm" />
    <br />
  </div>
)

Sizes.story = {
  name: 'sizes',
}
