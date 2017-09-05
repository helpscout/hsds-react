import React, { PureComponent as Component } from 'react'
import { storiesOf } from '@storybook/react'
import { Animate } from '../src/index.js'

class AnimateOutExample extends Component {
  constructor () {
    super()
    this.state = {
      show: true
    }
  }

  toggleIn () {
    this.setState({
      show: !this.state.show
    })
  }

  render () {
    const { show } = this.state
    const toggleIn = this.toggleIn.bind(this)

    return (
      <div>
        <button onClick={toggleIn}>Toggle Animation</button>
        <br />
        <Animate in={show} sequence='fadeIn down' duration={100}>
          <div className='dont-override-this'>Then, Fade In and Down</div>
        </Animate>
      </div>
    )
  }
}

storiesOf('Animate', module)
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
