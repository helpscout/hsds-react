import React from 'react'
import { storiesOf } from '@storybook/react'
import { StatusAvatar } from '../src/index'
import AvatarSpec from '../src/utilities/specs/avatar.specs'

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
