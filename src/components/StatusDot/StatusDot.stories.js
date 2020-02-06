import React from 'react'
import { StatusDot } from '../index'

export default {
  component: StatusDot,
  title: 'Components/Badges/StatusDot',
}

export const Default = () => <StatusDot />

Default.story = {
  name: 'default',
}

export const BorderColor = () => (
  <div>
    <div>
      <StatusDot status="online" inline borderColor="red" />: Online
    </div>
  </div>
)

BorderColor.story = {
  name: 'borderColor',
}

export const OuterBorderColor = () => (
  <div>
    <div>
      <StatusDot status="online" inline outerBorderColor="red" />: Online
    </div>
  </div>
)

OuterBorderColor.story = {
  name: 'outerBorderColor',
}

export const States = () => (
  <div>
    <div>
      <StatusDot status="online" inline />: Online
    </div>
    <div>
      <StatusDot status="offline" inline />: Offline
    </div>
    <div>
      <StatusDot status="busy" inline />: Busy
    </div>
    <div>
      <StatusDot status="active" inline />: Active
    </div>
    <div>
      <StatusDot status="inactive" inline />: Inactive
    </div>
  </div>
)

States.story = {
  name: 'states',
}

export const Sizes = () => (
  <div>
    <div>
      <StatusDot inline size="md" />: MD
    </div>
    <div>
      <StatusDot inline size="sm" />: SM
    </div>
  </div>
)

Sizes.story = {
  name: 'sizes',
}
