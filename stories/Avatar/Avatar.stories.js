import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Flexy } from '../../src/index'
import { ThemeProvider } from '../../src/components/styled'
import AvatarSpec from './specs/Avatar'

import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'

const stories = storiesOf('Avatar', module)

stories.addDecorator(
  withKnobs({
    escapeHTML: false,
  })
)

const fixture = AvatarSpec.generate()

stories.add('default', () => (
  <Avatar name={fixture.name} image={fixture.image} />
))

stories.add('failed', () => (
  <Avatar name={fixture.name} image="https://notfound" />
))

stories.add('fallback', () => (
  <Avatar
    name={fixture.name}
    image="https://notfound"
    fallbackImage={fixture.image}
  />
))

stories.add('fallback failed', () => (
  <Avatar
    name={fixture.name}
    image="https://notfound"
    fallbackImage="https://notfound2"
  />
))

stories.add('themed', () => (
  <div>
    <ThemeProvider theme={{ brandColor: { brandColor: 'red' } }}>
      <Avatar name={fixture.name} image="https://notfound" />
    </ThemeProvider>
    <ThemeProvider theme={{ brandColor: { brandColor: 'green' } }}>
      <Avatar name={fixture.name} image="https://notfound" />
    </ThemeProvider>
    <ThemeProvider theme={{ brandColor: { brandColor: 'blue' } }}>
      <Avatar name={fixture.name} image="https://notfound" />
    </ThemeProvider>
  </div>
))

stories.add('status', () => (
  <div style={{ background: 'dodgerblue', padding: 20 }}>
    <Flexy just="left">
      <Avatar
        borderColor="dodgerblue"
        name={fixture.name}
        image={fixture.image}
        status="online"
        shape="square"
        showStatusBorderColor
        size="lg"
      />
      <Avatar
        borderColor="dodgerblue"
        image={fixture.image}
        name={fixture.name}
        outerBorderColor="white"
        showStatusBorderColor
        size="lg"
        status="offline"
      />
      <Avatar
        borderColor="dodgerblue"
        name={fixture.name}
        image={fixture.image}
        shape="rounded"
        showStatusBorderColor
        status="busy"
        size="lg"
      />
    </Flexy>
    <br />
    <Flexy just="left">
      <Avatar
        borderColor="dodgerblue"
        name={fixture.name}
        image={fixture.image}
        showStatusBorderColor
        status="online"
        shape="square"
      />
      <Avatar
        borderColor="dodgerblue"
        name={fixture.name}
        image={fixture.image}
        showStatusBorderColor
        status="offline"
      />
      <Avatar
        borderColor="dodgerblue"
        name={fixture.name}
        image={fixture.image}
        shape="rounded"
        showStatusBorderColor
        status="busy"
      />
    </Flexy>
    <br />
    <Flexy just="left">
      <Avatar
        borderColor="dodgerblue"
        name={fixture.name}
        image={fixture.image}
        showStatusBorderColor
        status="online"
        shape="square"
        size="sm"
      />
      <Avatar
        borderColor="dodgerblue"
        name={fixture.name}
        image={fixture.image}
        showStatusBorderColor
        status="offline"
        size="sm"
      />
      <Avatar
        borderColor="dodgerblue"
        name={fixture.name}
        image={fixture.image}
        shape="rounded"
        showStatusBorderColor
        status="busy"
        size="sm"
      />
    </Flexy>
  </div>
))

stories.add('initials', () => <Avatar name={fixture.name} />)

stories.add('sizes', () => (
  <div>
    <Avatar name={fixture.name} size="lg" />
    <Avatar name={fixture.name} size="md" />
    <Avatar name={fixture.name} size="sm" />
  </div>
))

stories.add('border', () => (
  <div style={{ background: 'orangered', padding: 20 }}>
    <Avatar
      borderColor="orangered"
      outerBorderColor="white"
      name={fixture.name}
      showStatusBorderColor
      size="lg"
      status="online"
    />
  </div>
))

const iconSize = [
  '8',
  '10',
  '12',
  '13',
  '14',
  '15',
  '16',
  '18',
  '20',
  '24',
  '32',
  '48',
  '52',
]
stories.add('with action', () => (
  <Flexy just="left">
    <Avatar
      name={fixture.name}
      image={fixture.image}
      active={boolean('Is Active', false)}
      actionable={boolean('Actionable', true)}
      animateActionBorder={boolean('Animate', false)}
      actionIcon={select('Icon', ['trash', 'plus-large', 'hyphen'], 'trash')}
      actionIconSize={select('Icon Size', iconSize, '24')}
      shape={select('Shape', ['circle', 'square', 'rounded'], 'circle')}
      onActionClick={action('handle click action')}
    />
  </Flexy>
))
