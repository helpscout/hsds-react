import React, { Component } from 'react'
import classNames from '../../utilities/classNames'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import Icon from '../Icon'
import Text from '../Text'

export const propTypes = {
  formatter: PropTypes.func,
  live: PropTypes.bool,
  read: PropTypes.bool,
  muted: PropTypes.bool,
  timestamp: PropTypes.string
}

const defaultProps = {
  formatter: timestamp => timestamp,
  live: false,
  read: false,
  timestamp: '9:41am'
}

class Timestamp extends Component {
  constructor (props) {
    super(props)

    this.mounted = false
  }

  componentDidMount () {
    const { live } = this.props
    this.mounted = true

    if (live) {
      this.tick(true)
    }
  }

  componentDidUpdate (lastProps) {
    const { live: lastLive, timestamp: lastTimestamp } = lastProps
    const { live, timestamp } = this.props

    if (live !== lastLive || timestamp !== lastTimestamp) {
      if (!live && this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      this.tick()
    }
  }

  componentWillUnmount () {
    this.mounted = false

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)

      this.timeoutId = undefined
    }
  }

  tick (refresh) {
    const { live } = this.props

    if (!this.mounted || !live) {
      return
    }

    // const then = dateParser(this.props.date).valueOf()
    // if (!then) {
    //   console.warn('[react-timeago] Invalid Date provided')
    //   return
    // }
    //
    // const now = this.props.now()
    // const seconds = Math.round(Math.abs(now - then) / 1000)
    //
    // const unboundPeriod =
    //   seconds < MINUTE
    //     ? 1000
    //     : seconds < HOUR
    //     ? 1000 * MINUTE
    //     : seconds < DAY
    //       ? 1000 * HOUR
    //       : 0
    // const period = Math.min(
    //   Math.max(unboundPeriod, this.props.minPeriod * 1000),
    //   this.props.maxPeriod * 1000,
    // )

    this.timeoutId = setTimeout(this.tick, 60000)

    if (!refresh) {
      this.forceUpdate()
    }
  }

  render () {
    const {
      className,
      formatter,
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
      <Icon name='tick-large' size='12' faint title='Read' />
    ) : null

    return (
      <div className={componentClassName} {...rest}>
        <Flexy gap='xs' just='left'>
          <Flexy.Item>
            <Text size='12' faint disableSelect noWrap>
              <time dateTime={timestamp}>{formatter(timestamp)}</time>
            </Text>
          </Flexy.Item>
          <Flexy.Item>
            {readMarkup}
          </Flexy.Item>
        </Flexy>
      </div>
    )
  }
}

Timestamp.propTypes = propTypes
Timestamp.defaultProps = defaultProps

export default Timestamp
