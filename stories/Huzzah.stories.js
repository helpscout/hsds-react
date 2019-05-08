import React from 'react'
import { storiesOf } from '@storybook/react'
import { Centralize, Huzzah, Text } from '../src/index'
import huzzahSet from '../src/components/Huzzah/huzzahs'

const stories = storiesOf('Huzzah', module)
const huzzahs = Object.keys(huzzahSet)

stories.add('Huzzah', () => {
  const huzzahsMarkup = huzzahs.map(i => (
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

  return <div>{huzzahsMarkup}</div>
})

stories.add('Random', () => {
  return <Huzzah isRandom />
})
