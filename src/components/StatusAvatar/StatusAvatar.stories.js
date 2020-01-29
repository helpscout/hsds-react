import React from 'react'
import { storiesOf } from '@storybook/react'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import { StatusAvatar } from '../index'

const stories = storiesOf('StatusAvatar', module)
const fixture = AvatarSpec.generate()

stories.add('default', () => (
  <StatusAvatar name={fixture.name} image={fixture.image} />
))

stories.add('status:icon', () => (
  <div>
    <StatusAvatar name={fixture.name} image={fixture.image} isOnline />
    <br />
    <StatusAvatar name={fixture.name} image={fixture.image} isOnline={false} />
  </div>
))
