import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon, Text } from '../src/index.js'

storiesOf('Icon', module)
  .add('icons', () => {
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
      'cross-large',
      'cross-medium',
      'cross-small',
      'document',
      'emoji',
      'helpscout-logo',
      'image-add',
      'image',
      'link',
      'meatball',
      'search',
      'star',
      'tick-large',
      'tick-small',
      'video'
    ].map(i => (
      <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
        <Icon name={i} key={i} center />
        <Text muted size='sm'>{i}</Text>
        <br />
      </div>
    ))

    return (<div>{icons}</div>)
  })
  .add('sizes', () => {
    const icons = [
      14, 16, 18, 24
    ].map(i => (
      <div style={{display: 'inline-block', margin: 12, textAlign: 'center'}}>
        <Icon name='emoji' size={i} key={i} center />
        <Text muted size='sm'>{i}</Text>
        <br />
      </div>
    ))

    return (<div>{icons}</div>)
  })
  .add('colors', () => {
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
