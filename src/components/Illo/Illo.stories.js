import React from 'react'
import { storiesOf } from '@storybook/react'
import { Centralize, Illo, Text } from '../index'
import illosData from './illos'

const stories = storiesOf('PhaseOut/Illo', module)

stories.add('Illo', () => {
  const icons = Object.keys(illosData).map(i => (
    <div
      style={{ display: 'inline-block', margin: 12, textAlign: 'center' }}
      key={i}
    >
      <Centralize>
        <Illo name={i} key={i} color="#116ce1" />
      </Centralize>
      <Text muted size="13">
        {i}
      </Text>
      <br />
    </div>
  ))

  return <div>{icons}</div>
})

stories.add('colors', () => {
  const icons = ['red', 'blue', 'green', 'orange', 'purple', 'black'].map(i => (
    <div style={{ display: 'inline-block', margin: 12, textAlign: 'center' }}>
      <Centralize>
        <Illo name="plane" key={i} color={i} />
      </Centralize>
      <Text muted size="13">
        {i}
      </Text>
      <br />
    </div>
  ))

  return <div>{icons}</div>
})

stories.add('custom colors', () => (
  <div
    style={{
      background: '#ff9900',
      display: 'inline-block',
      margin: 12,
      textAlign: 'center',
    }}
  >
    <Centralize>
      <Illo
        name="plane"
        color="rgba(0, 0, 0, 0.9)"
        colorSecondary="rgba(255, 255, 255, 0.5)"
      />
    </Centralize>
    <Text muted size="13">
      Plane
    </Text>
    <br />
  </div>
))

stories.add('sizes', () => {
  const icons = ['40', '60', '72', '80'].map(i => (
    <div style={{ display: 'inline-block', margin: 12, textAlign: 'center' }}>
      <Centralize>
        <Illo name="chatListBlankSlate" size={i} key={i} />
      </Centralize>
      <Text muted size="13">
        {i}
      </Text>
      <br />
    </div>
  ))

  return <div>{icons}</div>
})
