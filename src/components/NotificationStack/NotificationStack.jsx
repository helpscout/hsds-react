import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { NotificationStackUI } from './NotificationStack.css'

export class NotificationStack extends React.PureComponent {
  static propTypes = {
    autoDismiss: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    limit: PropTypes.number,
  }

  static defaultProps = {
    autoDismiss: false,
    limit: 5,
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
    theme: 'chat',
  }

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

export default NotificationStack
