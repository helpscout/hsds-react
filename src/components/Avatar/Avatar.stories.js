import React from 'react'
import { ThemeProvider } from 'styled-components'
import { boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import { getColor } from '../../styles/utilities/color'
import { Avatar, Flexy, Button } from '../index'

export default {
  component: Avatar,
  title: 'Components/Badges/Avatar',
}

const fixture = AvatarSpec.generate()

class AvatarReload extends React.Component {
  state = {
    fixture: null,
  }
  constructor() {
    super()
    this.state.fixture = AvatarSpec.generate()
  }
  reload = () => {
    const fixture = AvatarSpec.generate()
    this.setState({
      fixture,
    })
  }
  render() {
    return (
      <ThemeProvider
        theme={{ brandColor: { brandColor: getColor('grey.300') } }}
      >
        <div>
          <div>
            <h2>Avatar:</h2>{' '}
            <Avatar
              name={this.state.fixture.name}
              image={this.state.fixture.image}
            />
          </div>
          <button onClick={this.reload}>reload</button>
        </div>
      </ThemeProvider>
    )
  }
}

export const Default = () => {
  return <AvatarReload />
}

Default.story = {
  name: 'default',
}

export const Failed = () => (
  <Avatar name={fixture.name} image="https://notfound" />
)

Failed.story = {
  name: 'failed',
}

export const Fallback = () => (
  <Avatar
    name={fixture.name}
    image="https://notfound"
    fallbackImage={fixture.image}
  />
)

Fallback.story = {
  name: 'fallback',
}

export const FallbackFailed = () => (
  <Avatar
    name={fixture.name}
    image="https://notfound"
    fallbackImage="https://notfound2"
  />
)

FallbackFailed.story = {
  name: 'fallback failed',
}

export const Themed = () => (
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
)

Themed.story = {
  name: 'themed',
}

export const Status = () => (
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
)

Status.story = {
  name: 'status',
}

export const Initials = () => <Avatar name={fixture.name} />

Initials.story = {
  name: 'initials',
}

export const Sizes = () => (
  <div>
    <Avatar name={fixture.name} size="lg" />
    <Avatar name={fixture.name} size="md" />
    <Avatar name={fixture.name} size="sm" />
  </div>
)

Sizes.story = {
  name: 'sizes',
}

export const Border = () => (
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
)

Border.story = {
  name: 'border',
}

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
const avatarSize = ['lg', 'md', 'smmd', 'sm', 'xs', 'xxs']

export const WithAction = () => (
  <Flexy just="left">
    <Avatar
      name={fixture.name}
      image={fixture.image}
      active={boolean('Is Active', false)}
      actionable={boolean('Actionable', true)}
      animateActionBorder={boolean('Animate', false)}
      actionIcon={select('Icon', ['trash', 'plus-large', 'hyphen'], 'trash')}
      actionIconSize={select('Icon Size', iconSize, '24')}
      size={select('Avatar Size', avatarSize, 'lg')}
      shape={select('Shape', ['circle', 'square', 'rounded'], 'circle')}
      onActionClick={action('handle click action')}
      fallbackImage="https://d33v4339jhl8k0.cloudfront.net/customer-avatar/01.png"
    />
  </Flexy>
)

WithAction.story = {
  name: 'with action',
}
