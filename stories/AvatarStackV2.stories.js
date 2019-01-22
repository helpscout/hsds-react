import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard, Guide, GuideContainer } from '@helpscout/artboard'
import { Avatar, AvatarStack } from '../src/index.js'
import AvatarSpec from './Avatar/specs/Avatar'

const guides = [
  {
    width: '100%',
    height: '60px',
    top: '50%',
    marginTop: '-30px',
    opacity: 0.1,
  },
]

const stories = storiesOf('AvatarStack/V2', module)
stories.addDecorator(
  withArtboard({ id: 'hsds-avatarstack', guides, width: 400, height: 100 })
)
stories.addDecorator(withKnobs)

class Example extends React.Component {
  state = {
    avatars: AvatarSpec.generate(1),
  }

  addAvatar = () => {
    this.setState({
      avatars: [...this.state.avatars, AvatarSpec.generate()],
    })
  }

  removeAvatar = () => {
    this.setState({
      avatars: this.state.avatars.slice(0, -1),
    })
  }

  renderGuides = () => {
    return (
      <GuideContainer
        position="absolute"
        left="-20px"
        right="-20px"
        width="calc(100% + 40px)"
      >
        <Guide
          width="100%"
          height="60px"
          top="50%"
          marginTop="-30px"
          opacity={0.1}
        />
        <Guide width="100%" height="1px" top="50%" showValues={false} />
        <Guide
          width="1px"
          height="100%"
          top="0"
          left="50%"
          showValues={false}
        />
        <Guide
          width="100%"
          height="1px"
          top="8px"
          showValues={false}
          color="blue"
        />
        <Guide
          width="100%"
          height="1px"
          bottom="8px"
          showValues={false}
          color="blue"
        />
      </GuideContainer>
    )
  }

  render() {
    return (
      <Artboard width={360} height={180}>
        <div>
          <div style={{ margin: 20, position: 'relative' }}>
            {this.renderGuides()}
            <AvatarStack max={5} version={2} {...this.props}>
              {this.state.avatars.map(avatar => (
                <Avatar {...avatar} key={avatar.id} />
              ))}
            </AvatarStack>
          </div>
          <button onClick={this.addAvatar}>Add Avatar</button>
          <button onClick={this.removeAvatar}>Remove Avatar</button>
        </div>
      </Artboard>
    )
  }
}

stories.add('default', () => {
  const avatars = number('avatars', 1)

  const animationDuration = number('animationDuration', 300)
  const animationEasing = text('animationEasing', 'ease')
  const animationSequence = text('animationSequence', 'fade')
  const max = number('max', 5)

  const animation = number('animationDuration', 300)
  const size = select(
    'size',
    {
      default: null,
      lg: 'lg',
      md: 'md',
      smmd: 'smmd',
      sm: 'sm',
      xs: 'xs',
      xxs: 'xxs',
    },
    null
  )

  const shape = select(
    'shape',
    {
      square: 'square',
      rounded: 'rounded',
      circle: 'circle',
    },
    'circle'
  )

  const avatarsMarkup = [...Array(avatars)].map(() => {
    const avatar = AvatarSpec.generate()
    return <Avatar {...avatar} key={avatar.id} />
  })

  const props = {
    animationDuration,
    animationEasing,
    animationSequence,
    max,
    shape,
    size,
    version: 2,
  }

  return <AvatarStack {...props}>{avatarsMarkup}</AvatarStack>
})
