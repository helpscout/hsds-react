import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { NotificationStackUI } from './NotificationStack.css'

const noop = () => undefined

export class NotificationStack extends React.PureComponent {
  firstNotificationId = null

  constructor(props) {
    super(props)
    this.state = {
      isDismissable: props.autoDismiss,
    }
  }

  handleOnMouseEnter = event => {
    const { autoDismiss, onMouseEnter } = this.props
    if (autoDismiss) {
      this.setState({
        isDismissable: false,
      })
    }
    onMouseEnter(event)
  }

  handleOnMouseLeave = event => {
    const { autoDismiss, onMouseLeave } = this.props
    if (autoDismiss) {
      this.setState({
        isDismissable: true,
      })
    }
    onMouseLeave(event)
  }

  handleOnNotificationClick = (...eventProps) => {
    const { onClick } = this.props
    this.firstNotificationId = null
    onClick(...eventProps)
  }

  setFirstNotificationId(id) {
    if (!this.firstNotificationId) {
      this.firstNotificationId = id
    }
  }

  renderChildren() {
    const { children, limit } = this.props
    const { isDismissable } = this.state

    return React.Children.map(children, (child, index) => {
      const count = React.Children.count(children) - index
      const isActive = count < limit + 1
      const { from: fromProp, id } = child.props

      this.setFirstNotificationId(id)

      const from = id === this.firstNotificationId ? fromProp : null

      return React.cloneElement(child, {
        from,
        isActive,
        isDismissable,
        onClick: this.handleOnNotificationClick,
      })
    })
  }

  render() {
    const { className, theme, ...rest } = this.props
    const componentClassName = classNames(
      'c-NotificationStack',
      theme && `is-theme-${theme}`,
      className
    )

    return (
      <NotificationStackUI
        {...getValidProps(rest)}
        className={componentClassName}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        {this.renderChildren()}
      </NotificationStackUI>
    )
  }
}

NotificationStack.defaultProps = {
  autoDismiss: false,
  'data-cy': 'NotificationStack',
  limit: 5,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  theme: 'chat',
}

NotificationStack.propTypes = {
  className: PropTypes.string,
  /** Enables the auto-dismissal timers for [Notification](../Notification) components. Default `false`. */
  autoDismiss: PropTypes.bool,
  /** Callback when a child Notification is clicked. */
  onClick: PropTypes.func,
  /** Maximum number of Notifications to display. Default `5`. */
  limit: PropTypes.number,
  /** Theme of notifications. Default `chat`. */
  theme: PropTypes.string,
  /** Callback on mouse enter. */
  onMouseEnter: PropTypes.func,
  /** Callback on mouse leave. */
  onMouseLeave: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default NotificationStack
