import React, { PureComponent as Component } from 'react'
import AvatarSpec from '../../utilities/specs/avatarGrid.specs'
import { Avatar, AvatarList } from '../index'

export default {
  component: AvatarList,
  title: 'Components/Structural/AvatarList',
}
const fixtures = AvatarSpec.generate(20)

const avatarsMarkup = fixtures.map(avatar => {
  const { name, image } = avatar
  return <Avatar image={image} key={name} name={name} />
})

export const Default = () => <AvatarList max={4}>{avatarsMarkup}</AvatarList>

Default.story = {
  name: 'default',
}

export const AddRemove = () => {
  class Example extends Component {
    state = { avatars: [] }

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
      const avatarsMarkup = this.state.avatars.map(avatar => {
        const { name, image } = avatar
        return <Avatar image={image} key={name} name={name} />
      })

      return (
        <div>
          <button onClick={this.addAvatar}>Add</button>
          <button onClick={this.removeAvatar}>Remove</button>
          <br />
          <AvatarList max={4}>{avatarsMarkup}</AvatarList>
        </div>
      )
    }
  }

  return <Example />
}

AddRemove.story = {
  name: 'Add/Remove',
}
