import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, AvatarStack } from '../../src/index.js'
import AvatarSpec from '../Avatar/specs/Avatar'

const stories = storiesOf('AvatarStack/V2', module)

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

  render() {
    return (
      <div>
        <AvatarStack max={5} version={2} {...this.props}>
          {this.state.avatars.map(avatar => (
            <Avatar {...avatar} key={avatar.id} />
          ))}
        </AvatarStack>
        <button onClick={this.addAvatar}>Add Avatar</button>
        <button onClick={this.removeAvatar}>Remove Avatar</button>
      </div>
    )
  }
}

stories.add('default', () => <Example />)
stories.add('size', () => <Example size="sm" />)
