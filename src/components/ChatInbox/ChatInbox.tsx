import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Collapsible from '../Collapsible'
import Header from './ChatInbox.Header'
import Content from './ChatInbox.Content'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { namespaceComponent, isComponentNamed } from '../../utilities/component'
import { COMPONENT_KEY } from './ChatInbox.utils'
import { ChatInboxUI } from './styles/ChatInbox.css.js'

type Props = {
  className?: string
  isCollapsible: boolean
  isCollapsed: boolean
}

type State = {
  isCollapsed: boolean
}

class ChatInbox extends React.Component<Props, State> {
  static defaultProps = {
    isCollapsible: false,
    isCollapsed: true,
  }

  static Header = Header
  static Content = Content

  constructor(props: Props) {
    super(props)
    this.state = {
      isCollapsed: props.isCollapsed,
    }
    // TODO: fix typescript complains
    // @ts-ignore
    this._selfManageCollapse = props.isCollapsed !== undefined
  }

  handleOnClickHeader = (event, onClick = noop) => {
    const { isCollapsible } = this.props
    /* istanbul ignore else */
    if (isCollapsible) {
      this.setState({ isCollapsed: !this.state.isCollapsed })
    }
    // TODO: fix typescript complains
    // @ts-ignore
    onClick && onClick(event)
  }

  render() {
    const {
      className,
      children,
      isCollapsed: propsIsCollapsed,
      isCollapsible,
      ...rest
    } = this.props

    const { isCollapsed } = this.state

    const componentClassName = classNames('c-ChatInbox', className)

    const contentMarkup = React.Children.map(children, (child: any, index) => {
      const childProps = child.props

      if (isComponentNamed(child, COMPONENT_KEY.Header)) {
        return React.cloneElement(child, {
          key: index,
          isCollapsed,
          isCollapsible,
          onClick: event => {
            this.handleOnClickHeader(event, childProps.onClick)
          },
        })
      }

      if (isComponentNamed(child, COMPONENT_KEY.Content) && isCollapsible) {
        return (
          <Collapsible isOpen={!isCollapsed} key={index} duration={250}>
            {child}
          </Collapsible>
        )
      }

      return React.cloneElement(child, { key: index })
    })

    return (
      <ChatInboxUI {...getValidProps(rest)} className={componentClassName}>
        {contentMarkup}
      </ChatInboxUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.ChatInbox)(ChatInbox)

export default ChatInbox
