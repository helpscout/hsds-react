import React, { PureComponent as Component } from 'react'
import AvatarSpec from '../../utilities/specs/avatarGrid.specs'
import { Avatar, AvatarGrid } from '../index'

export default {
  component: AvatarGrid,
  title: 'Phaseout/AvatarGrid',
}
const fixtures = AvatarSpec.generate(20)

const avatarsMarkup = fixtures.map(avatar => {
  const { name, image, status } = avatar
  return (
    <Avatar
      image={image}
      key={name}
      name={name}
      shape="rounded"
      status={status}
    />
  )
})

const aFewAvatarsMarkup = AvatarSpec.generate(2).map(avatar => {
  const { name, image, status } = avatar
  return (
    <Avatar
      image={image}
      key={name}
      name={name}
      shape="rounded"
      status={status}
    />
  )
})

class TestComponent extends Component {
  constructor() {
    super()
    this.state = { avatars: [], someProp: 0 }
  }

  updateState = () => {
    const avatars = AvatarSpec.generate(30).map(avatar => {
      const { name, image, status } = avatar
      return (
        <Avatar
          image={image}
          key={name}
          name={name}
          shape="rounded"
          status={status}
        />
      )
    })

    this.setState({
      avatars,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.updateState}>(Re)Render avatars</button>
        <AvatarGrid max={14}>{this.state.avatars}</AvatarGrid>
      </div>
    )
  }
}

export const Default = () => (
  <div style={{ background: '#eee', padding: 10 }}>
    <AvatarGrid borderColor="#eee" showStatusBorderColor max={14}>
      {avatarsMarkup}
    </AvatarGrid>
  </div>
)

Default.story = {
  name: 'default',
}

export const Animations = () => (
  <AvatarGrid animationSequence="scaleLg" animationStagger={100} max={9}>
    {aFewAvatarsMarkup}
  </AvatarGrid>
)

Animations.story = {
  name: 'animations',
}

export const Few = () => <AvatarGrid max={14}>{aFewAvatarsMarkup}</AvatarGrid>

Few.story = {
  name: 'few',
}

export const Size = () => (
  <AvatarGrid max={9} size="sm">
    {avatarsMarkup}
  </AvatarGrid>
)

Size.story = {
  name: 'size',
}

export const Shape = () => (
  <AvatarGrid max={9} shape="circle">
    {avatarsMarkup}
  </AvatarGrid>
)

Shape.story = {
  name: 'shape',
}

export const TestRender = () => <TestComponent />

TestRender.story = {
  name: 'test: render',
}
