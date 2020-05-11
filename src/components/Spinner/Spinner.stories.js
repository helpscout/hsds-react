import React from 'react'
import { Spinner } from '../index'

export default {
  component: Spinner,
  title: 'Components/Elements/Spinner',
}

export const Default = () => (
  <div>
    <Spinner />
  </div>
)

Default.story = {
  name: 'default',
}

export const Sizes = () => (
  <div>
    <div>
      xl
      <Spinner size="xl" />
    </div>
    <div>
      lg
      <Spinner size="lg" />
    </div>
    <div>
      md
      <Spinner size="md" />
    </div>
    <div>
      sm
      <Spinner size="sm" />
    </div>
    <div>
      xs
      <Spinner size="xs" />
    </div>
  </div>
)

Sizes.story = {
  name: 'sizes',
}
