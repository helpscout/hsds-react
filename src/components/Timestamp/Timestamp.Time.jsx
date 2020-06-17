import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { calculateTimeoutPeriod } from '../../utilities/timestamp'

class Time extends React.Component {
  timeoutId = undefined
  _isMounted = false

  componentDidMount() {
    const { live } = this.props
    this._isMounted = true

    if (live) {
      // Start the tick
      this.tick(true)
    }
  }

  componentDidUpdate(prevProps) {
    const { live: lastLive, timestamp: lastTimestamp } = prevProps
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
    const { className, formatter, timestamp, ...rest } = this.props

    return (
      <time {...getValidProps(rest)} className={className} dateTime={timestamp}>
        {formatter(timestamp)}
      </time>
    )
  }
}

Time.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  formatter: PropTypes.func,
  live: PropTypes.bool,
  timestamp: PropTypes.string,
}

Time.defaultProps = {
  'data-cy': 'Time',
  formatter: timestamp => timestamp,
  live: false,
}

export default Time
