import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Notification from '../Notification'
import classNames from '../../utilities/classNames'
import {noop} from '../../utilities/other'

export const propTypes = {
  autoDismiss: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  limit: PropTypes.number,
  theme: PropTypes.oneOf([
    'chat'
  ])
}

const defaultProps = {
  autoDismiss: false,
  limit: 5,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  theme: 'chat'
}

class NotificationStack extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDismissable: props.autoDismiss
    }
    this.firstNotificationId = null
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnNotificationClick = this.handleOnNotificationClick.bind(this)
  }

  handleOnMouseEnter (event) {
    const {autoDismiss, onMouseEnter} = this.props
    if (autoDismiss) {
      this.setState({
        isDismissable: false
      })
    }
    onMouseEnter(event)
  }

  handleOnMouseLeave (event) {
    const {autoDismiss, onMouseLeave} = this.props
    if (autoDismiss) {
      this.setState({
        isDismissable: true
      })
    }
    onMouseLeave(event)
  }

  handleOnNotificationClick (...eventProps) {
    const {onClick} = this.props
    this.firstNotificationId = null
    onClick(...eventProps)
  }

  setFirstNotificationId (id) {
    if (!this.firstNotificationId) {
      this.firstNotificationId = id
    }
  }

  render () {
    const {
      autoDismiss,
      children,
      className,
      onClick,
      onMouseEnter,
      onMouseLeave,
      limit,
      theme,
      ...rest
    } = this.props
    const {isDismissable} = this.state

    const handleOnMouseEnter = this.handleOnMouseEnter
    const handleOnMouseLeave = this.handleOnMouseLeave
    const handleOnNotificationClick = this.handleOnNotificationClick

    const componentClassName = classNames(
      'c-NotificationStack',
      theme && `is-theme-${theme}`,
      className
    )

    const childrenMarkup = React.Children.map(children, (child, index) => {
      if (!child.type || child.type !== Notification) return null
      const count = React.Children.count(children) - index
      const isActive = count < (limit + 1)

      const {from: fromProp, id} = child.props
      this.setFirstNotificationId(id)

      const from = id === this.firstNotificationId ? fromProp : null

      return React.cloneElement(child, {
        from,
        isActive,
        isDismissable,
        onBubbleClick: handleOnNotificationClick
      })
    })

    return (
      <div
        className={componentClassName}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        {...rest}
      >
        {childrenMarkup}
      </div>
    )
  }
}

NotificationStack.propTypes = propTypes
NotificationStack.defaultProps = defaultProps
NotificationStack.displayName = 'NotificationStack'

export default NotificationStack
