import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Animate, Card, Heading, Text } from '../src/index.js'

class AnimateOutExample extends Component {
  constructor () {
    super()
    this.state = {
      show: false
    }
    this.toggleIn = this.toggleIn.bind(this)
  }

  toggleIn () {
    this.setState({
      show: !this.state.show
    })
  }

  render () {
    const { show } = this.state
    const toggleIn = this.toggleIn

    return (
      <div>
        <button onClick={toggleIn}>Toggle Animation</button>
        <br />
        <div style={{width: 300}}>
          <Animate in={show} sequence='fade down' duration={300} animateOnMount={false} unmountOnExit>
            <Card>
              <Heading>Anchorman</Heading>
              <Text>Stay classy San Diego!</Text>
            </Card>
          </Animate>
        </div>
      </div>
    )
  }
}

storiesOf('Animate', module)
  .add('default', () => (
    <div>
      <p>No delay</p>
      <Animate sequence='fade down'>
        <Card>
          <Heading>Anchorman</Heading>
          <Text>Stay classy San Diego!</Text>
        </Card>
      </Animate>
    </div>
  ))
  .add('custom wait/duration', () => (
    <div>
      <p>Tiny tiny delay</p>
      <Animate sequence='scale' wait={300}>
        <Card>
          <Heading>Anchorman</Heading>
          <Text>Stay classy San Diego!</Text>
        </Card>
      </Animate>
      <br />
      <p>Wait 1 second… (duration: 400ms)</p>
      <Animate sequence='fade down' wait={1000} duration={400}>
        <Card>
          <Heading>Anchorman</Heading>
          <Text>Stay classy San Diego!</Text>
        </Card>
      </Animate>
      <br />
      <p>Suupperr slow (duration: 3000ms)</p>
      <Animate sequence='fade down' duration={3000}>
        <Card>
          <Heading>Anchorman</Heading>
          <Text>Stay classy San Diego!</Text>
        </Card>
      </Animate>
      <br />
    </div>
  ))
  .add('animateOut', () => (
    <AnimateOutExample />
  ))
