import React from 'react'
import { storiesOf } from '@storybook/react'
import { createSpec, faker } from '@helpscout/helix'
import { DetailList, Text } from '../index'

const fixture = createSpec({
  text: faker.lorem.sentence(),
}).generate(7)

const ItemsMarkup = fixture.map(o => {
  return (
    <DetailList.Item key={o.text}>
      <Text>{o.text}</Text>
    </DetailList.Item>
  )
})

const stories = storiesOf('DetailList', module)

stories.add('default', () => (
  <DetailList>
    <DetailList.Title>Title</DetailList.Title>
    {ItemsMarkup}
  </DetailList>
))
