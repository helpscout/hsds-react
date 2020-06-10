import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { TimerUI } from './Notification.css'

export class Timer extends React.PureComponent {
  render() {
    const {
      className,
      isRunning,
      onTimerEnd,
      style,
      timeout,
      ...rest
    } = this.props
    const componentClassName = classNames('c-NotificationTimer', className)
    const duration = typeof timeout === 'number' ? `${timeout}ms` : timeout
    const styles = Object.assign({}, style, {
      animationDuration: duration,
      animationPlayState: isRunning ? 'running' : 'paused',
    })

    return (
      <TimerUI
        {...getValidProps(rest)}
        className={componentClassName}
        onAnimationEnd={onTimerEnd}
        style={styles}
      />
    )
  }
}

Timer.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  isRunning: PropTypes.bool,
  onTimerEnd: PropTypes.func,
  style: PropTypes.any,
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Timer.defaultProps = {
  'data-cy': 'Timer',
  isRunning: true,
  onTimerEnd: noop,
  style: {},
  timeout: 5000,
}

export default Timer
