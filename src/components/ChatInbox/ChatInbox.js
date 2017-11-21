import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Collapsible from '../Collapsible'
import Header from './Header'
import Content from './Content'
import classNames from '../../utilities/classNames'

export const propTypes = {
  isCollapsible: PropTypes.bool,
  isCollapsed: PropTypes.bool
}

const defaultProps = {
  isCollapsible: false,
  isCollapsed: false
}

class ChatInbox extends Component {
  constructor (props) {
    super()
    this.state = {
      isCollapsed: props.isCollapsed
    }
    this._selfManageCollapse = props.isCollapsed !== undefined
    this.handleOnClickHeader = this.handleOnClickHeader.bind(this)
  }

  handleOnClickHeader (event, onClick) {
    const { isCollapsible } = this.props

    if (isCollapsible) {
      this.setState({ isCollapsed: !this.state.isCollapsed })
    }
    onClick(event)
  }

  render () {
    const {
      className,
      children,
      isCollapsed: propsIsCollapsed,
      isCollapsible,
      ...rest
    } = this.props
    const { isCollapsed } = this.state

    const handleOnClickHeader = this.handleOnClickHeader

    const componentClassName = classNames(
      'c-ChatInbox',
      className
    )

    const contentMarkup = React.Children.map(children, (child, index) => {
      const childProps = child.props

      if (child.type === Header) {
        return React.cloneElement(child, {
          key: index,
          isCollapsed,
          isCollapsible,
          onClick: (event) => {
            handleOnClickHeader(event, childProps.onClick)
          }
        })
      }

      if (child.type === Content && isCollapsible) {
        return (
          <Collapsible isOpen={isCollapsed} key={index} duration={250}>
            {child}
          </Collapsible>
        )
      }

      return React.cloneElement(child, { key: index })
    })

    return (
      <div className={componentClassName} {...rest}>
        {contentMarkup}
      </div>
    )
  }
}

ChatInbox.propTypes = propTypes
ChatInbox.defaultProps = defaultProps
ChatInbox.displayName = 'ChatInbox'
ChatInbox.Header = Header
ChatInbox.Content = Content

export default ChatInbox
