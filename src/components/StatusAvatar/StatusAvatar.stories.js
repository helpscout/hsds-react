import React from 'react'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import { StatusAvatar } from '../index'

export default {
  component: StatusAvatar,
  title: 'Components/Badges/StatusAvatar',
}

const fixture = AvatarSpec.generate()

export const Default = () => (
  <StatusAvatar name={fixture.name} image={fixture.image} />
)

Default.story = {
  name: 'default',
}

export const StatusIcon = () => (
  <div>
    <StatusAvatar name={fixture.name} image={fixture.image} isOnline />
    <br />
    <StatusAvatar name={fixture.name} image={fixture.image} isOnline={false} />
  </div>
)

StatusIcon.story = {
  name: 'status:icon',
}
