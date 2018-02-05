import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flexy, Icon, Text } from '../src/index.js'

const stories = storiesOf('Icon', module)

stories.add('icons', () => {
  const icons = [
    'alert',
    'arrow-left',
    'arrow-right',
    'attachment',
    'caret-down',
    'caret-left',
    'caret-right',
    'caret-up',
    'chat-active',
    'chat',
    'clock-large',
    'clock-small',
    'collapse',
    'cross-large',
    'cross-medium',
    'cross-small',
    'document',
    'drag',
    'emoji',
    'helpscout-logo',
    'image-add',
    'image',
    'link',
    'meatball',
    'minimize',
    'search',
    'star',
    'tag',
    'tick-large',
    'tick-small',
    'video',
    'user'
  ].map(i => (
    <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
      <Icon name={i} key={i} center />
      <Text muted size='sm'>{i}</Text>
      <br />
    </div>
  ))

  return (<div>{icons}</div>)
})

stories.add('sizes', () => {
  const icons = [
    '14', '16', '18', '24'
  ].map(i => (
    <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
      <Icon name='emoji' size={i} key={i} center />
      <Text muted size='sm'>{i}</Text>
      <br />
    </div>
  ))

  return (<div>{icons}</div>)
})

stories.add('colors', () => {
  return (
    <div>
      <div>
        <Icon name='emoji' />
        <Text muted size='sm'>Regular</Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name='emoji' muted />
        <Text muted size='sm'>Muted</Text>
        <br />
      </div>
    </div>
  )
})

stories.add('shades', () => {
  return (
    <div>
      <div>
        <Icon name='emoji' />
        <Text muted size='sm'>Regular</Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name='emoji' shade='subtle' />
        <Text muted size='sm'>Subtle</Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name='emoji' shade='muted' />
        <Text muted size='sm'>Muted</Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name='emoji' shade='faint' />
        <Text muted size='sm'>Faint</Text>
        <br />
      </div>
      <br />
      <div>
        <Icon name='emoji' shade='extraMuted' />
        <Text muted size='sm'>Extra Muted</Text>
        <br />
      </div>
    </div>
  )
})

stories.add('withCaret', () => {
  const icons = [
    '14', '16', '18', '24'
  ].map(i => (
    <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
      <Icon name='user' size={i} key={i} center withCaret />
      <Text muted size='sm'>{i}</Text>
      <br />
    </div>
  ))

  return (
    <div>
      <Flexy just='left'>
        <Flexy.Item>
          <Icon name='user' withCaret />
        </Flexy.Item>
        <Flexy.Item>
          <Text muted size='sm'>With Caret</Text>
        </Flexy.Item>
      </Flexy>

      <Flexy just='left'>
        <Flexy.Item>
          <Icon name='user' withCaret muted />
        </Flexy.Item>
        <Flexy.Item>
          <Text muted size='sm'>Muted + Caret</Text>
        </Flexy.Item>
      </Flexy>

      <Flexy just='left' style={{color: 'red'}}>
        <Flexy.Item>
          <Icon name='user' withCaret />
        </Flexy.Item>
        <Flexy.Item>
          <Text muted size='sm'>Caret + Custom color</Text>
        </Flexy.Item>
      </Flexy>

      {icons}
    </div>
  )
})
