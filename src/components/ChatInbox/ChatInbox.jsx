import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Collapsible from '../Collapsible'
import Header from './ChatInbox.Header'
import Content from './ChatInbox.Content'
import { classNames } from '../../utilities/classNames'

class ChatInbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isCollapsible: PropTypes.bool,
    isCollapsed: PropTypes.bool,
  }

  static defaultProps = {
    isCollapsible: false,
    isCollapsed: true,
  }

  static Header = Header
  static Content = Content

  constructor(props) {
    super(props)
    this.state = {
      isCollapsed: props.isCollapsed,
    }
    this._selfManageCollapse = props.isCollapsed !== undefined
  }

  handleOnClickHeader = (event, onClick) => {
    const { isCollapsible } = this.props

    if (isCollapsible) {
      this.setState({ isCollapsed: !this.state.isCollapsed })
    }
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

    const contentMarkup = React.Children.map(children, (child, index) => {
      const childProps = child.props
      if (child.type && child.type === Header) {
        return React.cloneElement(child, {
          key: index,
          isCollapsed,
          isCollapsible,
          onClick: event => {
            this.handleOnClickHeader(event, childProps.onClick)
          },
        })
      }

      if (child.type && child.type === Content && isCollapsible) {
        return (
          <Collapsible isOpen={!isCollapsed} key={index} duration={250}>
            {child}
          </Collapsible>
        )
      }

      return React.cloneElement(child, { key: index })
    })

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        {contentMarkup}
      </div>
    )
  }
}

export default ChatInbox
