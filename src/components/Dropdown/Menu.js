import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash.includes'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  onFirstItemFocus: PropTypes.func,
  onLastItemFocus: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

const defaultProps = {
  onFirstItemFocus: noop,
  onLastItemFocus: noop,
  isOpen: false,
  onClose: noop
}

class Menu extends Component {
  constructor (props) {
    super()
    this.state = {
      prevFocusIndex: null,
      focusIndex: null,
      hasFocus: false,
      isOpen: props.isOpen
    }
    this.items = []
    this.isFocused = false

    this.handleUpArrow = this.handleUpArrow.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleLeftArrow = this.handleLeftArrow.bind(this)
    this.handleRightArrow = this.handleRightArrow.bind(this)
    this.handleShiftTab = this.handleShiftTab.bind(this)
    this.handleTab = this.handleTab.bind(this)

    this.handleFocusItemNode = this.handleFocusItemNode.bind(this)
    this.handleItemOnBlur = this.handleItemOnBlur.bind(this)
    this.handleItemOnFocus = this.handleItemOnFocus.bind(this)
    this.handleOnClose = this.handleOnClose.bind(this)
    // this.handleTab = this.handleTab.bind(this)
    this.handleFocusFirstItem = this.handleFocusFirstItem.bind(this)
    this.handleFocusLastItem = this.handleFocusLastItem.bind(this)
  }

  componentDidMount () {
    this.mapRefsToItems()
    this.setMenuFocus()
  }

  componentWillUpdate (nextProps) {
    if (this.props.children !== nextProps.children) {
      this.mapRefsToItems()
    }
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen })
    }
  }

  setMenuFocus () {
    this.isFocused = true
  }

  mapRefsToItems () {
    this.items = []
    Object.keys(this.refs).forEach(key => {
      if (includes(key, 'item-')) {
        this.items.push(this.refs[key])
      }
    })
  }

  getIndexFromItem (item) {
    return this.items.indexOf(item)
  }

  itemHasMenu (item) {

  }

  isLastItemFocused () {
    const { focusIndex } = this.state
    return focusIndex === this.items.length - 1
  }

  incrementFocusIndex (direction = 'up') {
    const { focusIndex } = this.state
    let newFocusIndex
    let prevFocusIndex

    if (direction === 'up') {
      prevFocusIndex = focusIndex
      newFocusIndex = focusIndex <= 1 ? 0 : focusIndex - 1
    }
    if (direction === 'down') {
      prevFocusIndex = focusIndex
      newFocusIndex = focusIndex === null ? 0 : (this.items.length - 1) <= focusIndex ? focusIndex : focusIndex + 1
    }
    if (direction === 'reset') {
      prevFocusIndex = null
      newFocusIndex = null
    }
    if (direction === 'start') {
      prevFocusIndex = 0
      newFocusIndex = 0
    }

    this.setState({
      prevFocusIndex,
      focusIndex: newFocusIndex
    })
  }

  handleUpArrow () {
    if (!this.isFocused) return
    this.incrementFocusIndex('up')
    this.handleFocusItemNode()
  }

  handleDownArrow () {
    if (!this.isFocused) return
    this.incrementFocusIndex('down')
    this.handleFocusItemNode()
  }

  handleLeftArrow () {
  }

  handleRightArrow () {
  }

  handleTab () {
    this.incrementFocusIndex('down')
  }

  handleShiftTab () {
    this.incrementFocusIndex('up')
  }

  handleFocusItemNode () {
    const { focusIndex } = this.state
    const focusItem = this.items[focusIndex]

    focusItem.node.focus()
  }

  handleItemOnBlur () {
    this.setState({ focusIndex: 0 })
  }

  handleItemOnFocus (event, reactEvent, item) {
    const focusIndex = this.getIndexFromItem(item)
    this.setState({ focusIndex })
  }

  handleOnClose () {
    const { onClose } = this.props
    this.setState({ isOpen: false })
    onClose()
  }

  handleFocusFirstItem (event) {
    const { onFirstItemFocus } = this.props
    const { prevFocusIndex, focusIndex } = this.state

    if (focusIndex === 0 && prevFocusIndex !== null) {
      this.incrementFocusIndex('reset')
      onFirstItemFocus()
    } else {
      this.incrementFocusIndex('start')
      setTimeout(() => {
        this.handleFocusItemNode()
      }, 0)
    }
  }

  handleFocusLastItem (event) {
    const { onLastItemFocus } = this.props
    this.handleOnClose()
    onLastItemFocus()
  }

  render () {
    const {
      children,
      className,
      onFirstItemFocus,
      onLastItemFocus,
      isOpen,
      onClose,
      ...rest
    } = this.props

    const handleUpArrow = this.handleUpArrow
    const handleDownArrow = this.handleDownArrow
    const handleLeftArrow = this.handleLeftArrow
    const handleRightArrow = this.handleRightArrow
    const handleTab = this.handleTab
    const handleShiftTab = this.handleShiftTab

    const handleItemOnBlur = this.handleItemOnBlur
    const handleItemOnFocus = this.handleItemOnFocus
    const handleOnClose = this.handleOnClose
    const handleFocusFirstItem = this.handleFocusFirstItem
    const handleFocusLastItem = this.handleFocusLastItem

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
        <KeypressListener keyCode={Keys.UP_ARROW} handler={handleUpArrow} type='keydown' />
        <KeypressListener keyCode={Keys.DOWN_ARROW} handler={handleDownArrow} type='keydown' />
        <KeypressListener keyCode={Keys.LEFT_ARROW} handler={handleLeftArrow} type='keydown' />
        <KeypressListener keyCode={Keys.RIGHT_ARROW} handler={handleRightArrow} type='keydown' />
        <KeypressListener keyCode={Keys.RIGHT_ARROW} handler={handleRightArrow} type='keydown' />
        <KeypressListener keyCode={Keys.RIGHT_ARROW} handler={handleRightArrow} type='keydown' />
        <KeypressListener keyCode={Keys.ESCAPE} handler={handleOnClose} />
        <KeypressListener keyCode={Keys.TAB} handler={handleTab} only />
        <KeypressListener keyCode={Keys.TAB} modifier='shift' handler={handleShiftTab} />
        <div tabIndex={0} onFocus={handleFocusFirstItem} />
        <ul>
          {childrenMarkup}
        </ul>
        <div tabIndex={0} onFocus={handleFocusLastItem} />
      </div>
    )
  }
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps

export default Menu
