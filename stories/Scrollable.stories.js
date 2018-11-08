import React from 'react'
import { storiesOf } from '@storybook/react'
import { createSpec, faker } from '@helpscout/helix'
import { Card, Image, Scrollable } from '../src/index.js'

const ContentSpec = createSpec({
  content: faker.lorem.paragraph(),
  id: faker.random.uuid(),
})

const stories = storiesOf('Scrollable', module)

stories.add('default', () => (
  <Card style={{ height: 400 }} seamless>
    <Scrollable>
      <Image
        src="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
        alt="Not now, Arctic Puffin!"
        title="Not now, Arctic Puffin!"
      />
    </Scrollable>
  </Card>
))

stories.add('fade', () => (
  <Card style={{ height: 400 }} seamless>
    <Scrollable fade fadeBottom>
      <Card.Block>
        {ContentSpec.generate(20).map(({ id, content }) => (
          <p key={id}>{content}</p>
        ))}
      </Card.Block>
    </Scrollable>
  </Card>
))
