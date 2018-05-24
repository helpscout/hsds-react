import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, AvatarGrid } from '../../src/index.js'
import AvatarSpec from './specs/Avatar'

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
    this.state = { someProp: 0 }
    this.updateState = this.updateState.bind(this)
  }
  updateState() {
    this.setState({
      someProp: this.state.someProp + 1,
    })
  }
  render() {
    console.log(`AvatarGrid: TestComponent: render(${this.state.someProp})`)
    return (
      <div>
        <AvatarGrid max={14}>{avatarsMarkup}</AvatarGrid>
        <button onClick={this.updateState}>Update: State</button>
      </div>
    )
  }
}

stories.add('default', () => <AvatarGrid max={14}>{avatarsMarkup}</AvatarGrid>)

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
