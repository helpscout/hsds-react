import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { NotificationStackUI } from './styles/NotificationStack.css'

export interface Props {
  autoDismiss: boolean
  className?: string
  children?: any
  onClick: (...args: any) => void
  onMouseEnter: (event: Event) => void
  onMouseLeave: (event: Event) => void
  limit: number
  theme: 'chat'
}

export interface State {
  isDismissable: boolean
}

export class NotificationStack extends React.PureComponent<Props, State> {
  static defaultProps = {
    autoDismiss: false,
    limit: 5,
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,
    theme: 'chat',
  }

  firstNotificationId?: any = null

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
