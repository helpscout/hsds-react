import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash.includes'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  onFirstItemFocus: PropTypes.func,
  onLastItemFocus: PropTypes.func
}

const defaultProps = {
  onFirstItemFocus: noop,
  onLastItemFocus: noop
}

class Menu extends Component {
  constructor () {
    super()
    this.state = {
      focusIndex: -1,
      hasFocus: false
    }
    this.items = []
    this.hasFocus = false
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleUpArrow = this.handleUpArrow.bind(this)
    this.handleFocusItemNode = this.handleFocusItemNode.bind(this)
    this.handleItemOnBlur = this.handleItemOnBlur.bind(this)
    this.handleItemOnFocus = this.handleItemOnFocus.bind(this)
  }

  componentDidMount () {
    this.mapRefsToItems()
  }

  componentWillUpdate (nextProps) {
    if (this.props.children !== nextProps.children) {
      this.mapRefsToItems()
    }
  }

  mapRefsToItems () {
    Object.keys(this.refs).forEach(key => {
      if (includes(key, 'item-')) {
        this.items.push(this.refs[key])
      }
    })
  }

  getIndexFromItem (item) {
    return this.items.indexOf(item)
  }

  handleUpArrow () {
    const { focusIndex } = this.state

    const newFocusIndex = focusIndex === -1 ? (this.items.length - 1) : focusIndex <= 0 ? 0 : focusIndex - 1
    this.setState({ focusIndex: newFocusIndex })

    this.handleFocusItemNode()
  }

  handleDownArrow () {
    const { focusIndex } = this.state

    const newFocusIndex = (this.items.length - 1) <= focusIndex ? focusIndex : focusIndex + 1
    this.setState({ focusIndex: newFocusIndex })

    this.handleFocusItemNode()
  }

  handleFocusItemNode () {
    const { focusIndex } = this.state
    const { onFirstItemFocus, onLastItemFocus } = this.props
    const focusItem = this.items[focusIndex]

    focusItem.node.focus()

    if (focusIndex === -1) {
      onFirstItemFocus(focusItem)
    }
    if (focusIndex === this.items.length - 1) {
      onLastItemFocus(focusItem)
    }
  }

  handleItemOnBlur () {
    this.setState({ focusIndex: -1 })
  }

  handleItemOnFocus (event, reactEvent, item) {
    const focusIndex = this.getIndexFromItem(item)
    this.setState({ focusIndex })
  }

  render () {
    const {
      children,
      className,
      onFirstItemFocus,
      onLastItemFocus,
      ...rest
    } = this.props

    const handleDownArrow = this.handleDownArrow
    const handleUpArrow = this.handleUpArrow
    const handleItemOnBlur = this.handleItemOnBlur
    const handleItemOnFocus = this.handleItemOnFocus

    const childrenMarkup = React.Children.map(children, (child, index) => {
      const itemRef = `item-${index}`
      return React.cloneElement(child, {
        ref: itemRef,
        onBlur: handleItemOnBlur,
        onFocus: handleItemOnFocus
      })
    })

    const componentClassName = classNames(
      'c-DropdownMenu',
      className
    )

    return (
      <div className={componentClassName} {...rest}>
        <KeypressListener keyCode={Keys.DOWN_ARROW} handler={handleDownArrow} type='keydown' />
        <KeypressListener keyCode={Keys.UP_ARROW} handler={handleUpArrow} type='keydown' />
        <ul>
          {childrenMarkup}
        </ul>
      </div>
    )
  }
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps

export default Menu
