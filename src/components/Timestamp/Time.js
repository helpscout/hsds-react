import React, { Component } from 'react'
import { calculateTimeoutPeriod } from '../../utilities/timestamp'
import PropTypes from 'prop-types'

export const propTypes = {
  formatter: PropTypes.func,
  live: PropTypes.bool,
}

const defaultProps = {
  formatter: timestamp => timestamp,
  live: false,
}

class Time extends Component {
  constructor(props) {
    super(props)

    this.timeoutId = undefined
    this._isMounted = false
  }

  componentDidMount() {
    const { live } = this.props
    this._isMounted = true

    if (live) {
      // Start the tick
      this.tick(true)
    }
  }

  componentDidUpdate(lastProps) {
    const { live: lastLive, timestamp: lastTimestamp } = lastProps
    const { live, timestamp } = this.props

    if (live !== lastLive || timestamp !== lastTimestamp) {
      if (!live && this.timeoutId) {
        // Clear the timeout if now not live
        clearTimeout(this.timeoutId)
        this.timeoutId = undefined
      }

      // Tick to update the timestamp
      this.tick()
    }
  }

  componentWillUnmount() {
    this._isMounted = false

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
  }

  tick(refresh) {
    const { live, timestamp } = this.props

    if (!this._isMounted || !live) {
      return
    }

    const period = calculateTimeoutPeriod(timestamp)

    if (period > 0) {
      this.timeoutId = setTimeout(this.tick.bind(this), period)
    }

    if (!refresh) {
      this.forceUpdate()
    }
  }

  render() {
    const { className, formatter, timestamp } = this.props

    return (
      <time className={className} dateTime={timestamp}>
        {formatter(timestamp)}
      </time>
    )
  }
}

Time.propTypes = propTypes
Time.defaultProps = defaultProps

export default Time
