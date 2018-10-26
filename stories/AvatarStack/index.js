import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, AvatarStack } from '../../src/index.js'
import AvatarSpec from '../AvatarGrid/specs/Avatar'
import './AvatarStackV2'

const stories = storiesOf('AvatarStack', module)
const fixtures = AvatarSpec.generate(5)

const avatarsMarkup = fixtures.map(avatar => {
  const { name, image, status } = avatar
  return <Avatar image={image} key={name} name={name} status={status} />
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
    console.log(`AvatarStack: TestComponent: render(${this.state.someProp})`)
    return (
      <div>
        <AvatarStack max={5}>{avatarsMarkup}</AvatarStack>
        <button onClick={this.updateState}>Update: State</button>
      </div>
    )
  }
}

stories.add('default', () => <AvatarStack max={5}>{avatarsMarkup}</AvatarStack>)

stories.add('animation: easing', () => (
  <AvatarStack animationEasing="bounce" animationSequence="fade scale" max={4}>
    {avatarsMarkup}
  </AvatarStack>
))

stories.add('test: render', () => <TestComponent />)
