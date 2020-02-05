import React, { PureComponent as Component } from 'react'
import AvatarSpec from '../../utilities/specs/avatarGrid.specs'
import { Avatar, AvatarList } from '../index'

export default {
  component: AvatarList,
  title: 'Components/AvatarList',
}
const fixtures = AvatarSpec.generate(20)

const avatarsMarkup = fixtures.map(avatar => {
  const { name, image } = avatar
  return <Avatar image={image} key={name} name={name} shape="rounded" />
})

class TestComponent extends Component {
  constructor() {
    super()
    this.state = { someProp: 0 }
    this.updateState = this.updateState.bind(this)
  }
  updateState() {
    this.setState({
      someProp: this.state.someProp + 1,
    })
  }
  render() {
    console.log(`AvatarList: TestComponent: render(${this.state.someProp})`)
    return (
      <div>
        <AvatarList max={4}>{avatarsMarkup}</AvatarList>
        <button onClick={this.updateState}>Update: State</button>
      </div>
    )
  }
}

export const SampleComponent = props => {
  return <AvatarList max={2}>{avatarsMarkup}</AvatarList>
}

export const Default = () => <AvatarList max={4}>{avatarsMarkup}</AvatarList>

Default.story = {
  name: 'default',
}

export const AnimationEasing = () => (
  <AvatarList animationEasing="bounce" animationSequence="fade scale" max={4}>
    {avatarsMarkup}
  </AvatarList>
)

AnimationEasing.story = {
  name: 'animation: easing',
}

export const AnimationStaggering = () => (
  <AvatarList
    animationEasing="bounce"
    animationSequence="fade scale"
    animationStagger={100}
    max={4}
  >
    {avatarsMarkup}
  </AvatarList>
)

AnimationStaggering.story = {
  name: 'animation: staggering',
}

export const TestRender = () => <TestComponent />

TestRender.story = {
  name: 'test: render',
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
        return <Avatar image={image} key={name} name={name} shape="rounded" />
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
