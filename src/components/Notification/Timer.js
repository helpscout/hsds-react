import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

const propTypes = {
  isRunning: PropTypes.bool,
  onTimerEnd: PropTypes.func,
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

const defaultProps = {
  isRunning: true,
  onTimerEnd: noop,
  timeout: 5000,
}

class Timer extends Component {
  render() {
    const { className, isRunning, onTimerEnd, style, timeout } = this.props

    const componentClassName = classNames('c-NotificationTimer', className)

    const duration = typeof timeout === 'number' ? `${timeout}ms` : timeout

    const styles = Object.assign({}, style, {
      animationDuration: duration,
      animationPlayState: isRunning ? 'running' : 'paused',
    })

    return (
      <div
        className={componentClassName}
        onAnimationEnd={onTimerEnd}
        style={styles}
      />
    )
  }
}

Timer.propTypes = propTypes
Timer.defaultProps = defaultProps

export default Timer
