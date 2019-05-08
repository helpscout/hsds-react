import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { TimerUI } from './styles/Notification.css'

export interface Props {
  className?: string
  isRunning: boolean
  onTimerEnd: () => void
  style: Object
  timeout: number | string
}

export class Timer extends React.PureComponent<Props> {
  static defaultProps = {
    isRunning: true,
    onTimerEnd: noop,
    style: {},
    timeout: 5000,
  }

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

export default Timer
