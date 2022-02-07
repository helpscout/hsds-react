import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TimerUI } from './Notification.css'

export class Timer extends React.PureComponent {
  render() {
    const { className, isRunning, onTimerEnd, style, timeout } = this.props
    const componentClassName = classNames('c-NotificationTimer', className)
    const duration = typeof timeout === 'number' ? `${timeout}ms` : timeout
    const styles = Object.assign({}, style, {
      animationDuration: duration,
      animationPlayState: isRunning ? 'running' : 'paused',
    })

    return (
      <TimerUI
        className={componentClassName}
        onAnimationEnd={onTimerEnd}
        style={styles}
      />
    )
  }
}

Timer.propTypes = {
  className: PropTypes.string,
  isRunning: PropTypes.bool,
  onTimerEnd: PropTypes.func,
  style: PropTypes.any,
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Timer.defaultProps = {
  isRunning: true,
  onTimerEnd: () => undefined,
  style: {},
  timeout: 5000,
}

export default Timer
