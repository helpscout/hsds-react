import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'

export interface SleepDetectorProps {
  buffer: number
  interval: number
  onWake: (fn?) => void
}

export interface SleepDetectorState {
  lastRun: number
  intervalId: number
}

class SleepDetector extends React.Component<
  SleepDetectorProps,
  SleepDetectorState
> {
  static defaultProps = {
    buffer: 5000,
    interval: 10000,
    onWake: noop,
  }

  constructor(props) {
    super(props)
    
    
    this.state = {}
  }

  componentWillMount() {
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

export default SleepDetector
