import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Flexy } from '../../src/index.js'
import { ThemeProvider } from '../../src/components/styled'
import AvatarSpec from './specs/Avatar'
import './AvatarV2'

const stories = storiesOf('Avatar', module)
const fixture = AvatarSpec.generate()

stories.add('default', () => (
  <Avatar name={fixture.name} image={fixture.image} />
))

stories.add('fallback', () => (
  <Avatar name={fixture.name} image="https://notfound" />
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
