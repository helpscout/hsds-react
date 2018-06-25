import React from 'react'
import { storiesOf } from '@storybook/react'
import { Centralize, Huzzah, Text } from '../src/index.js'

const stories = storiesOf('Huzzah', module)

stories.add('Huzzah', () => {
  const huzzahs = ['donut', 'latte', 'rocket'].map(i => (
    <div style={{ display: 'inline-block', margin: 12, textAlign: 'center' }}>
      <Centralize>
        <Huzzah name={i} key={i} />
      </Centralize>
      <Text muted size="13">
        {i}
      </Text>
      <br />
    </div>
  ))

  return <div>{huzzahs}</div>
})

stories.add('Random', () => {
  return <Huzzah isRandom />
})
