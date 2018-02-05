import React from 'react'
import { storiesOf } from '@storybook/react'
import { Centralize, Illo, Text } from '../src/index.js'

const stories = storiesOf('Illo', module)

stories.add('Illo', () => {
  const icons = [
    'bulb',
    'chatListBlankSlate',
    'chat',
    'cross',
    'cross-white',
    'lock',
    'plane',
    'tick'
  ].map(i => (
    <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
      <Centralize>
        <Illo name={i} key={i} color='#116ce1' />
      </Centralize>
      <Text muted size='13'>{i}</Text>
      <br />
    </div>
  ))

  return (<div>{icons}</div>)
})

stories.add('colors', () => {
  const icons = [
    'red',
    'blue',
    'green',
    'orange',
    'purple',
    'black'
  ].map(i => (
    <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
      <Centralize>
        <Illo name='tick' key={i} color={i} />
      </Centralize>
      <Text muted size='13'>{i}</Text>
      <br />
    </div>
  ))

  return (<div>{icons}</div>)
})

stories.add('sizes', () => {
  const icons = [
    '40', '60', '72', '80'
  ].map(i => (
    <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
      <Centralize>
        <Illo name='chatListBlankSlate' size={i} key={i} />
      </Centralize>
      <Text muted size='13'>{i}</Text>
      <br />
    </div>
  ))

  return (<div>{icons}</div>)
})
