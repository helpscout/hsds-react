import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import AvatarSpec from '../../utilities/specs/avatarGrid.specs'
import { Avatar, AvatarGrid } from '../index'

const stories = storiesOf('AvatarGrid', module)
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

stories.add('default', () => (
  <div style={{ background: '#eee', padding: 10 }}>
    <AvatarGrid borderColor="#eee" showStatusBorderColor max={14}>
      {avatarsMarkup}
    </AvatarGrid>
  </div>
))

stories.add('animations', () => (
  <AvatarGrid animationSequence="scaleLg" animationStagger={100} max={9}>
    {aFewAvatarsMarkup}
  </AvatarGrid>
))

stories.add('few', () => <AvatarGrid max={14}>{aFewAvatarsMarkup}</AvatarGrid>)

stories.add('size', () => (
  <AvatarGrid max={9} size="sm">
    {avatarsMarkup}
  </AvatarGrid>
))

stories.add('shape', () => (
  <AvatarGrid max={9} shape="circle">
    {avatarsMarkup}
  </AvatarGrid>
))

stories.add('test: render', () => <TestComponent />)
