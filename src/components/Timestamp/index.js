import React, { Component } from 'react'
import classNames from '../../utilities/classNames'
import { calculateTimeoutPeriod } from '../../utilities/timestamp'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'

export const propTypes = {
  formatter: PropTypes.func,
  live: PropTypes.bool,
  read: PropTypes.bool,
  muted: PropTypes.bool,
  timestamp: PropTypes.string,
}

const defaultProps = {
  formatter: timestamp => timestamp,
  live: false,
  read: false,
  timestamp: '9:41am',
}

class Timestamp extends Component {
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
    const {
      children,
      className,
      formatter,
      live,
      muted,
      read,
      timestamp,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Timestamp',
      muted && 'is-muted',
      className
    )

    const readMarkup = read ? (
      <Icon name="tick-large" size="12" faint title="Read" />
    ) : null

    return (
      <div className={componentClassName} {...rest}>
        <Flexy gap="xs" just="left">
          <Flexy.Item>
            <Text size="12" faint disableSelect noWrap>
              <time dateTime={timestamp}>{formatter(timestamp)}</time>
            </Text>
          </Flexy.Item>
          <Flexy.Item>{readMarkup}</Flexy.Item>
        </Flexy>
      </div>
    )
  }
}

Timestamp.propTypes = propTypes
Timestamp.defaultProps = defaultProps

export default Timestamp
