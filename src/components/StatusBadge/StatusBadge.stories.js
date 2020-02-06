import React from 'react'
import { StatusBadge } from '../index'

export default {
  component: StatusBadge,
  title: 'Components/Badges/StatusBadge',
}

export const Default = () => (
  <div>
    <p>
      Regular:
      <StatusBadge count={19} />
    </p>
    <p>
      Big Number:
      <StatusBadge count={203021} />
    </p>
    <p>
      Big Number with commas:
      <StatusBadge count="2,043,021,134" />
    </p>
  </div>
)

Default.story = {
  name: 'default',
}

export const Status = () => (
  <div>
    <StatusBadge count={19} status="new" />
  </div>
)

Status.story = {
  name: 'status',
}
