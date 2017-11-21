import React from 'react'
import { storiesOf } from '@storybook/react'
import { Centralize, Illo, Text } from '../src/index.js'

const stories = storiesOf('Illo', module)

stories.add('Illo', () => {
  const icons = [
    'chatListBlankSlate'
  ].map(i => (
    <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
      <Centralize>
        <Illo name={i} key={i} />
      </Centralize>
      <Text muted size='sm'>{i}</Text>
      <br />
    </div>
  ))

  return (<div>{icons}</div>)
})

stories.add('sizes', () => {
  const icons = [
    '40', '60', '80'
  ].map(i => (
    <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
      <Centralize>
        <Illo name='chatListBlankSlate' size={i} key={i} />
      </Centralize>
      <Text muted size='sm'>{i}</Text>
      <br />
    </div>
  ))

  return (<div>{icons}</div>)
})
