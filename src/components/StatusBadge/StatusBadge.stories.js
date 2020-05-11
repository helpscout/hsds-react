import React from 'react'
import { StatusBadge } from '../index'

export default {
  component: StatusBadge,
  title: 'Components/Badges/Badge',
}

export const _StatusBadge = () => (
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

_StatusBadge.story = {
  name: 'status badge',
}

export const StatusNew = () => (
  <div>
    <StatusBadge count={19} status="new" />
  </div>
)

StatusNew.story = {
  name: 'status badge new',
}
