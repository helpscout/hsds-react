import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { Overflow } from '../src/index.js'

const ChatSpec = createSpec({
  id: faker.random.uuid(),
  message: faker.lorem.paragraph()
})

const fixture = ChatSpec.generate()

const stories = storiesOf('Overflow', module)

stories.add('default', () => (
  <div style={{width: '20%'}}>
    <Overflow>
      <div style={{width: 500}}>
        {fixture.message}
      </div>
    </Overflow>
  </div>
))
