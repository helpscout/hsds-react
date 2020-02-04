import React from 'react'
import { ThemeProvider } from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import { getColor } from '../../styles/utilities/color'
import { Avatar, Flexy, Button } from '../index'

const stories = storiesOf('Components/Avatar', module)

stories.addDecorator(
  withKnobs({
    escapeHTML: false,
  })
)

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

stories.add('default', () => {
  return <AvatarReload />
})

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
const avatarSize = ['lg', 'md', 'smmd', 'sm', 'xs', 'xxs']

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
      size={select('Avatar Size', avatarSize, 'lg')}
      shape={select('Shape', ['circle', 'square', 'rounded'], 'circle')}
      onActionClick={action('handle click action')}
      fallbackImage="https://d33v4339jhl8k0.cloudfront.net/customer-avatar/01.png"
    />
  </Flexy>
))

class AnimationSequence extends React.Component {
  state = {
    showLoadingAnimation: false,
    forceShowFallbackImage: false,
    fadeOutMainImage: false,
    actionable: true,
  }

  startAnimation = () => {
    this.setState({
      removingAvatarAnimation: true,
    })
  }

  render() {
    return (
      <div>
        <Avatar
          name={fixture.name}
          image={fixture.image}
          actionable={this.state.actionable}
          removingAvatarAnimation={this.state.removingAvatarAnimation}
          size="xl"
          onActionClick={this.startAnimation}
          fallbackImage="https://d33v4339jhl8k0.cloudfront.net/customer-avatar/01.png"
        />
        <Button
          onClick={() =>
            this.setState({
              removingAvatarAnimation: false,
            })
          }
        >
          Reset animation
        </Button>
      </div>
    )
  }
}

stories.add('with animation sequence', () => (
  <Flexy just="left">
    <AnimationSequence />
  </Flexy>
))
