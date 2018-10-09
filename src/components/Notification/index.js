import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import Flexy from '../Flexy'
import Message from '../Message'
import Text from '../Text'
import Truncate from '../Truncate'
import Timer from './Timer'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { stripUrlPrefix } from '../../utilities/strings'

export const propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  animationSequence: PropTypes.string,
  body: PropTypes.string,
  from: PropTypes.string,
  isActive: PropTypes.bool,
  isDismissable: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  onDismiss: PropTypes.func,
  timeout: PropTypes.number,
  type: PropTypes.oneOf(['image', 'link', 'text']),
  truncateLimit: PropTypes.number,
}

const defaultProps = {
  animationSequence: 'fade upUp',
  align: 'right',
  isActive: true,
  isDismissable: false,
  onClick: noop,
  onDismiss: noop,
  timeout: 2000,
  type: 'text',
  truncateLimit: 60,
}

class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: props.isActive,
    }

    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnExited = this.handleOnExited.bind(this)
    this.handleOnTimeout = this.handleOnTimeout.bind(this)

    this._isMounted = false
  }

  componentWillReceiveProps(nextProps) {
    const { isActive } = nextProps
    if (isActive === false) {
      this.forceDismiss()
    }
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  safeSetState(state) {
    if (this._isMounted) {
      this.setState(state)
    }
  }

  handleOnExited() {
    const { onDismiss } = this.props
    onDismiss(this.props)
  }

  handleOnTimeout() {
    this.forceDismiss()
  }

  forceDismiss() {
    this.safeSetState({
      isActive: false,
    })
  }

  handleOnClick(event) {
    const { onClick, isDismissable } = this.props
    if (isDismissable) {
      this.forceDismiss()
    }
    onClick(event)
  }

  render() {
    const {
      align,
      animationSequence,
      body,
      children,
      className,
      id,
      isActive: isActiveProp,
      from,
      isDismissable,
      onClick,
      onDismiss,
      timeout,
      truncateLimit,
      type,
      ...rest
    } = this.props
    const { isActive } = this.state

    const handleOnClick = this.handleOnClick
    const handleOnExited = this.handleOnExited
    const handleOnTimeout = this.handleOnTimeout

    const componentClassName = classNames(
      'c-Notification',
      'c-MessageBubbleWrapper',
      isDismissable && 'is-dismissable',
      align && `is-align-${align}`,
      type && `is-${type}`,
      className
    )

    let messageChildrenProp = null
    if (type === 'link') {
      messageChildrenProp = (
        <Text className="c-Notification__text" linkStyle truncate title={body}>
          {body}
        </Text>
      )
    } else if (type === 'image') {
      messageChildrenProp = (
        <Flexy gap="xs" className="c-Notification__textWrapper">
          <Flexy.Item>
            <Text className="c-Notification__textPrefix">New Image:</Text>
          </Flexy.Item>
          <Flexy.Block>
            <Text className="c-Notification__text" linkStyle title={body}>
              <Truncate type="middle" limit={24}>
                {stripUrlPrefix(body)}
              </Truncate>
            </Text>
          </Flexy.Block>
        </Flexy>
      )
    } else {
      messageChildrenProp = (
        <Text className="c-Notification__text" title={body}>
          <Truncate limit={truncateLimit} type="end">
            {body}
          </Truncate>
        </Text>
      )
    }

    const messageProps = {
      body: null,
      children: messageChildrenProp,
      from,
      onBubbleClick: handleOnClick,
    }

    return (
      <Animate
        className={componentClassName}
        in={isActive}
        onExited={handleOnExited}
        sequence={animationSequence}
      >
        <Message.Provider theme="notifications">
          <Message.Chat
            bubbleClassName="c-Notification__messageBubble"
            className="c-Notification__message"
            {...messageProps}
            {...rest}
          />
        </Message.Provider>
        <Timer
          isRunning={isDismissable}
          onTimerEnd={handleOnTimeout}
          timeout={timeout}
        />
      </Animate>
    )
  }
}

Notification.propTypes = propTypes
Notification.defaultProps = defaultProps
Notification.displayName = 'Notification'
Notification.Timer = Timer

export default Notification
