import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { Link, Timeline, Text } from '../index'

const fixture = createSpec({
  timestamp: '9:41am',
  text: faker.lorem.sentence(),
}).generate(7)

const ItemsMarkup = fixture.map(o => {
  return (
    <Timeline.Item key={o.text} timestamp={o.timestamp}>
      <Text>{o.text}</Text>
    </Timeline.Item>
  )
})

const stories = storiesOf('Timeline', module)

stories.add('default', () => (
  <Timeline>
    {ItemsMarkup}
    <Timeline.Item timestamp="9:41am">
      <Text>
        {fixture[0].text} <Link>Linky</Link>
      </Text>
    </Timeline.Item>
  </Timeline>
))

stories.add('single-item', () => <Timeline>{ItemsMarkup[0]}</Timeline>)

stories.add('two-items', () => (
  <Timeline>
    {ItemsMarkup[0]}
    {ItemsMarkup[1]}
  </Timeline>
))
