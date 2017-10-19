import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Animate, Card, Heading, Text } from '../src/index.js'
import Anime from '../src/components/Animate/new'

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
          <Anime in={show} sequence={['fade', 'scale']}>
            <Card>
              <Heading>Heading</Heading>
              <Text>Text…</Text>
            </Card>
          </Anime>
        </div>
      </div>
    )
  }
}

storiesOf('Animate', module)
  .add('new', () => (
    <AnimateOutExample />
  ))
  .add('default', () => (
    <div>
      Wait for it…
      <Animate sequence='fadeIn down'>
        <div className='dont-override-this'>Then, Fade In and Down</div>
      </Animate>
    </div>
  ))
  .add('custom wait/duration', () => (
    <div>
      Wait 1 second…
      <Animate sequence='fadeIn down' wait={1000} duration={400}>
        <div className='dont-override-this'>Then, Fade In and Down</div>
      </Animate>
    </div>
  ))
  .add('animateOut', () => (
    <AnimateOutExample />
  ))
