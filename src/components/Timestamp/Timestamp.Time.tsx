import * as React from 'react'
import { calculateTimeoutPeriod } from '../../utilities/timestamp'
import { Timestamp } from './Timestamp.types'

type Props = {
  className?: string
  formatter: (timestamp?: Timestamp) => string
  live?: boolean
  timestamp?: Timestamp
}

class Time extends React.Component<Props> {
  static defaultProps = {
    formatter: (timestamp: Timestamp) => timestamp,
    live: false,
  }
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

  componentDidUpdate(prevProps: Props) {
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

  tick(refresh?: any) {
    const { live, timestamp } = this.props

    if (!this._isMounted || !live) {
      return
    }

    const period = calculateTimeoutPeriod(timestamp)

    if (period > 0) {
      // TODO: fix typescript complains
      // @ts-ignore
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

export default Time
