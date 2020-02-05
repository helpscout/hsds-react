import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { Link, Timeline, Text } from '../index'

export default {
  component: Timeline,
  title: 'Components/Timeline',
}

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

export const Default = () => (
  <Timeline>
    {ItemsMarkup}
    <Timeline.Item timestamp="9:41am">
      <Text>
        {fixture[0].text} <Link>Linky</Link>
      </Text>
    </Timeline.Item>
  </Timeline>
)

Default.story = {
  name: 'default',
}

export const SingleItem = () => <Timeline>{ItemsMarkup[0]}</Timeline>

SingleItem.story = {
  name: 'single-item',
}

export const TwoItems = () => (
  <Timeline>
    {ItemsMarkup[0]}
    {ItemsMarkup[1]}
  </Timeline>
)

TwoItems.story = {
  name: 'two-items',
}
