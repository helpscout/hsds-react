import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import isString from 'lodash.isstring'
import Flexy from '../Flexy'
import Message from '../Message'
import Text from '../Text'
import Truncate from '../Truncate'
import Timer from './Notification.Timer'
import { NotificationUI, TextUI } from './Notification.css'
import classNames from 'classnames'

export const NOTIFICATION_TYPE = {
  image: 'image',
  link: 'link',
  text: 'text',
}

export class Notification extends React.PureComponent {
  static Timer = Timer

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isActive: props.isActive,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  forceDismiss() {
    if (this._isMounted) {
      this.setState(
        {
          isActive: false,
        },
        () => {
          this.props.onDismiss(this.props)
        }
      )
    }
  }

  handleOnExited = () => {
    this.props.onDismiss(this.props)
  }

  handleOnTimeout = () => {
    const { isDismissable } = this.props

    if (isDismissable) {
      this.forceDismiss()
    }
  }

  handleOnClick = event => {
    const { onClick, isDismissable } = this.props
    if (event && event.stopPropagation) {
      event.stopPropagation()
    }
    if (isDismissable) {
      this.forceDismiss()
    }
    onClick(event)
  }

  renderLinkContent() {
    const { body } = this.props
    return (
      <TextUI className="c-Notification__text" linkStyle truncate title={body}>
        {body}
      </TextUI>
    )
  }

  renderImageContent() {
    const { body } = this.props

    return (
      <Flexy gap="xs" className="c-Notification__textWrapper">
        <Flexy.Item>
          <Text className="c-Notification__textPrefix">New Image:</Text>
        </Flexy.Item>
        <Flexy.Block>
          <TextUI className="c-Notification__text" linkStyle title={body}>
            <Truncate type="middle" limit={24}>
              {stripUrlPrefix(body)}
            </Truncate>
          </TextUI>
        </Flexy.Block>
      </Flexy>
    )
  }

  renderDefaultContent() {
    const { body, truncateLimit } = this.props

    return (
      <TextUI className="c-Notification__text" title={body}>
        <Truncate limit={truncateLimit} type="end">
          {body}
        </Truncate>
      </TextUI>
    )
  }

  renderContent() {
    const { type } = this.props

    switch (type) {
      case NOTIFICATION_TYPE.image:
        return this.renderImageContent()

      case NOTIFICATION_TYPE.link:
        return this.renderLinkContent()

      default:
        return this.renderDefaultContent()
    }
  }

  render() {
    const {
      align,
      animationSequence,
      className,
      from,
      isDismissable,
      timeout,
      type,
      'data-cy': dataCy,
      ...rest
    } = this.props
    const { isActive } = this.state
    const componentClassName = classNames(
      'c-Notification',
      'c-MessageBubbleWrapper',
      isDismissable && 'is-dismissable',
      align && `is-align-${align}`,
      type && `is-${type}`,
      className
    )
    const messageProps = {
      body: null,
      children: this.renderContent(),
      from,
      onBubbleClick: this.handleOnClick,
    }

    return (
      <NotificationUI
        {...getValidProps(rest)}
        data-cy={dataCy}
        className={componentClassName}
        in={isActive}
        onExited={this.handleOnExited}
        sequence={animationSequence}
      >
        <Message.Provider theme="notifications">
          <Message.Chat
            bubbleClassName="c-Notification__messageBubble"
            className="c-Notification__message"
            {...rest}
            {...messageProps}
          />
        </Message.Provider>
        <Timer
          isRunning={isDismissable}
          onTimerEnd={this.handleOnTimeout}
          timeout={timeout}
        />
      </NotificationUI>
    )
  }
}

function noop() {}

Notification.defaultProps = {
  animationSequence: 'fade upUp',
  align: 'right',
  'data-cy': 'Notification',
  isActive: true,
  isDismissable: false,
  onClick: noop,
  onDismiss: noop,
  timeout: 2000,
  type: 'text',
  truncateLimit: 60,
}

Notification.propTypes = {
  className: PropTypes.string,
  /** Alignment of notification content. */
  align: PropTypes.oneOf(['left', 'right']),
  /** Animation style for this component. */
  animationSequence: PropTypes.string,
  /** Content for the component. */
  body: PropTypes.string,
  /** The name/label for the component's `body` content. */
  from: PropTypes.string,
  /** Determines the dismissal state of the component. */
  isActive: PropTypes.bool,
  /** Determines if the component can be dismissed. */
  isDismissable: PropTypes.bool,
  /** The ID of the component. Highly recommended. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback when the MessageBubble UI is clicked. */
  onClick: PropTypes.func,
  /** Callback when component is dismissed and removed from the DOM. */
  onDismiss: PropTypes.func,
  /** Amount of time before the component auto-dismisses. Only applicable if `isDismissable`. */
  timeout: PropTypes.number,
  /** Determine the type of content for the component. `image`: (Renders as an image link), `link`: (Renders as a link), `text`: (Renders as text) */
  type: PropTypes.oneOf(['image', 'link', 'text']),
  /** Determines the character count to truncate text. */
  truncateLimit: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export function stripUrlPrefix(url) {
  if (!isString(url)) return url

  return url.replace(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/g,
    ''
  )
}

export default Notification
