import React from 'react'
import PropTypes from 'prop-types'
import Animate from '.'
import { Card, Heading, Text } from '../index'

export class AnimateOutExample extends React.Component {
  constructor() {
    super()

    this.state = {
      show: false,
    }

    this.toggleIn = this.toggleIn.bind(this)
  }

  toggleIn() {
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    const { show } = this.state

    const toggleIn = this.toggleIn

    return (
      <div>
        <button onClick={toggleIn}>Toggle Animation</button>
        <br />
        <div
          style={{
            width: 300,
          }}
        >
          <Animate
            animateOnMount={false}
            duration={200}
            easing="bounce"
            in={show}
            sequence="fade down"
            unmountOnExit
          >
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
