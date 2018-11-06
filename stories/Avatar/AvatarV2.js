import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Flexy } from '../../src/index.js'
import AvatarSpec from './specs/Avatar'

const stories = storiesOf('Avatar/V2', module)
const fixture = AvatarSpec.generate()

stories.add('default', () => (
  <div style={{ background: 'dodgerblue', color: 'white', padding: 20 }}>
    <Flexy just="left" gap="xl">
      <Flexy.Item>
        <h4>Version 1</h4>
        <Avatar name={fixture.name} image={fixture.image} />
      </Flexy.Item>
      <Flexy.Item>
        <h4>Version 2</h4>
        <Avatar version={2} name={fixture.name} image={fixture.image} />
      </Flexy.Item>
    </Flexy>
  </div>
))
