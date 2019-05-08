import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Message from '../Message'
import Text from '../Text'
import Truncate from '../Truncate'
import Timer from './Notification.Timer'
import { NotificationUI, TextUI } from './styles/Notification.css'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { stripUrlPrefix } from '../../utilities/strings'
import { COMPONENT_KEY } from './Notification.utils'

export const NOTIFICATION_TYPE = {
  image: 'image',
  link: 'link',
  text: 'text',
}

export interface Props {
  align: 'left' | 'right'
  animationSequence: string
  body: string
  className?: string
  children?: any
  from: string
  isActive: boolean
  isDismissable: boolean
  id: string
  onClick: (...args: any) => void
  onDismiss: (...args: any) => void
  timeout: number
  type: 'image' | 'link' | 'text'
  truncateLimit: number
}

export interface State {
  isActive: boolean
}

export class Notification extends React.PureComponent<Props, State> {
  static defaultProps = {
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

  static Timer = Timer

  _isMounted: boolean = false

  constructor(props) {
    super(props)
    this.state = {
      isActive: props.isActive,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
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

  forceDismiss() {
    this.safeSetState({
      isActive: false,
    })
  }

  handleOnExited = () => {
    this.props.onDismiss(this.props)
  }

  handleOnTimeout = () => {
    this.forceDismiss()
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

namespaceComponent(COMPONENT_KEY)(Notification)
const PropConnectedComponent = propConnect(COMPONENT_KEY)(Notification)

export default PropConnectedComponent
