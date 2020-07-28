import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'

class SleepDetector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  UNSAFE_componentWillMount() {
    this.clearInterval()

    const { interval, buffer } = this.props
    const intervalId = setInterval(() => {
      const { onWake } = this.props
      const { lastRun } = this.state
      const now = Date.now()
      const delayTime = now - lastRun - interval
      if (delayTime > buffer) {
        onWake(delayTime)
      }
      this.setState({ lastRun: Date.now() })
    }, interval)

    const lastRun = Date.now()

    this.setState({ intervalId, lastRun })
  }

  componentWillUnmount() {
    this.clearInterval()
  }

  clearInterval() {
    const { intervalId } = this.state
    clearInterval(intervalId)
  }

  render() {
    return null
  }
}

SleepDetector.defaultProps = {
  buffer: 5000,
  interval: 10000,
  onWake: noop,
}
SleepDetector.propTypes = {
  /** How often (ms) to check for inactive tab (default is 10000) */
  buffer: PropTypes.number,
  /** How long (ms) of a delay to treat as a "sleep" event */
  interval: PropTypes.number,
  /** Callback to execute when we detect that the page has woken from sleep */
  onWake: PropTypes.func,
}

export default SleepDetector
