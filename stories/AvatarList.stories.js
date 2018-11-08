import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, AvatarList } from '../src/index.js'
import AvatarSpec from './AvatarGrid/specs/Avatar'

const stories = storiesOf('AvatarList', module)
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

stories.add('default', () => <AvatarList max={4}>{avatarsMarkup}</AvatarList>)

stories.add('animation: easing', () => (
  <AvatarList animationEasing="bounce" animationSequence="fade scale" max={4}>
    {avatarsMarkup}
  </AvatarList>
))

stories.add('animation: staggering', () => (
  <AvatarList
    animationEasing="bounce"
    animationSequence="fade scale"
    animationStagger={100}
    max={4}
  >
    {avatarsMarkup}
  </AvatarList>
))

stories.add('test: render', () => <TestComponent />)
