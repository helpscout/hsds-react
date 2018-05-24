import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { Truncate } from '../src/index.js'

const fixture = createSpec(faker.lorem.paragraph())

const stories = storiesOf('Truncate', module)
const limit = 10

stories.add('default', () => (
  <div>
    <p>
      Auto:<br />
      <Truncate>{fixture.generate()}</Truncate>
    </p>
    <p>
      Start:<br />
      <Truncate type="start" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      Middle:<br />
      <Truncate type="middle" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <p>
      End:<br />
      <Truncate type="end" limit={limit}>
        {fixture.generate()}
      </Truncate>
    </p>
    <br />
  </div>
))
