import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash.includes'
import KeypressListener from '../KeypressListener'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  enableCycling: PropTypes.bool,
  onFirstItemFocus: PropTypes.func,
  onLastItemFocus: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  parentMenu: PropTypes.bool,
  selectedIndex: PropTypes.number
}

const defaultProps = {
  enableCycling: false,
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
      focusIndex: props.selectedIndex !== undefined ? props.selectedIndex : null,
      hoverIndex: null,
      hasFocus: false,
      isOpen: props.isOpen
    }
    this.items = []
    this.isFocused = props.isOpen ? props.isOpen : false

    this.handleUpArrow = this.handleUpArrow.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleLeftArrow = this.handleLeftArrow.bind(this)
    this.handleRightArrow = this.handleRightArrow.bind(this)
    this.handleShiftTab = this.handleShiftTab.bind(this)
    this.handleTab = this.handleTab.bind(this)
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)

    this.handleFocusItemNode = this.handleFocusItemNode.bind(this)
    this.handleItemOnBlur = this.handleItemOnBlur.bind(this)
    this.handleItemOnFocus = this.handleItemOnFocus.bind(this)
    this.handleItemOnMouseEnter = this.handleItemOnMouseEnter.bind(this)
    this.handleItemOnMouseLeave = this.handleItemOnMouseLeave.bind(this)
    this.handleItemOnMenuClose = this.handleItemOnMenuClose.bind(this)
    this.handleItemOnClickToOpenMenu = this.handleItemOnClickToOpenMenu.bind(this)
    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleFocusFirstItem = this.handleFocusFirstItem.bind(this)
    this.handleFocusLastItem = this.handleFocusLastItem.bind(this)
  }

  componentDidMount () {
    this.mapRefsToItems()
    this.setMenuFocus()
  }

  componentWillUpdate (nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.mapRefsToItems()
      this.setState({ isOpen: nextProps.isOpen })
      this.isFocused = nextProps.isOpen
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.mapRefsToItems()
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
    const { enableCycling } = this.props
    const { focusIndex } = this.state
    const itemCount = this.items.length - 1
    let newFocusIndex
    let prevFocusIndex = focusIndex

    if (direction === 'up') {
      if (enableCycling) {
        newFocusIndex = focusIndex <= 0 ? itemCount : focusIndex - 1
      } else {
        newFocusIndex = focusIndex <= 0 ? 0 : focusIndex - 1
      }
    }
    if (direction === 'down') {
      if (enableCycling) {
        newFocusIndex = focusIndex === null ? 0 : itemCount <= focusIndex ? 0 : focusIndex + 1
      } else {
        newFocusIndex = focusIndex === null ? 0 : itemCount <= focusIndex ? focusIndex : focusIndex + 1
      }
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
      focusIndex: newFocusIndex,
      hoverIndex: null
    })
  }

  handleUpArrow (event) {
    event.preventDefault()
    if (!this.isFocused) return
    this.incrementFocusIndex('up')
    this.handleFocusItemNode()
  }

  handleDownArrow (event) {
    event.preventDefault()
    if (!this.isFocused) return
    this.incrementFocusIndex('down')
    this.handleFocusItemNode()
  }

  handleLeftArrow (event) {
    event.preventDefault()
    if (!this.isFocused) return
    const { parentMenu } = this.props
    if (parentMenu) {
      this.handleOnClose()
    }
  }

  handleRightArrow (event) {
    event.preventDefault()
    const { focusIndex } = this.state
    if (!this.isFocused) return

    if (focusIndex === null || focusIndex === undefined) return

    const item = this.items[focusIndex]
    if (item.menu) {
      this.setState({ selectedIndex: focusIndex })
      this.isFocused = false
    }
  }

  handleOnMouseEnter () {
    // const { parentMenu } = this.props
    // if (parentMenu) {
    //   this.isFocused = true
    // }
  }

  handleOnMouseLeave () {
    // const { parentMenu } = this.props
    // if (parentMenu) {
    //   this.isFocused = true
    // }
  }

  handleTab () {
    // this.incrementFocusIndex('down')
  }

  handleShiftTab () {
    // this.incrementFocusIndex('up')
  }

  handleFocusItemNode () {
    if (!this.isFocused) return
    const { focusIndex } = this.state
    const focusItem = this.items[focusIndex]
    if (focusItem) {
      focusItem.node.focus()
    }
  }

  handleItemOnBlur () {
  }

  handleItemOnFocus (event, reactEvent, item) {
    const focusIndex = this.getIndexFromItem(item)
    this.setState({ focusIndex, hoverIndex: null })
  }

  handleItemOnMouseEnter (event, reactEvent, item) {
    const { focusIndex: oldFocusIndex } = this.state
    const focusIndex = this.getIndexFromItem(item)
    const hoverIndex = focusIndex
    if (this.isFocused) {
      this.setState({ focusIndex, hoverIndex })
    } else {
      this.setState({ focusIndex: oldFocusIndex, hoverIndex })
    }
  }

  handleItemOnMouseLeave (event, reactEvent, item) {
    this.setState({ focusIndex: null, hoverIndex: null })
  }

  handleItemOnMenuClose () {
    this.isFocused = true
    this.setState({ selectedIndex: null, hoverIndex: null })
  }

  handleItemOnClickToOpenMenu (event, reactEvent, item) {
    const focusIndex = this.getIndexFromItem(item)
    this.setState({ selectedIndex: focusIndex })
    this.isFocused = false
  }

  handleOnClose () {
    const { onClose } = this.props
    this.setState({ selectedIndex: null, isOpen: false })
    onClose()
  }

  handleFocusFirstItem (event) {
    const { onFirstItemFocus, parentMenu } = this.props
    const { prevFocusIndex, focusIndex } = this.state

    if (parentMenu) {
      this.handleOnClose()
      return
    }

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
      enableCycling,
      isOpen,
      onClose,
      onFirstItemFocus,
      onLastItemFocus,
      parentMenu,
      selectedIndex: propsSelectedIndex,
      ...rest
    } = this.props
    const {
      focusIndex,
      hoverIndex,
      selectedIndex
    } = this.state

    const handleUpArrow = this.handleUpArrow
    const handleDownArrow = this.handleDownArrow
    const handleLeftArrow = this.handleLeftArrow
    const handleRightArrow = this.handleRightArrow
    const handleTab = this.handleTab
    const handleShiftTab = this.handleShiftTab
    const handleOnMouseEnter = this.handleOnMouseEnter
    const handleOnMouseLeave = this.handleOnMouseLeave

    const handleItemOnBlur = this.handleItemOnBlur
    const handleItemOnFocus = this.handleItemOnFocus
    const handleItemOnMouseEnter = this.handleItemOnMouseEnter
    const handleItemOnMouseLeave = this.handleItemOnMouseLeave
    const handleItemOnMenuClose = this.handleItemOnMenuClose
    const handleItemOnClickToOpenMenu = this.handleItemOnClickToOpenMenu
    const handleOnClose = this.handleOnClose
    const handleFocusFirstItem = this.handleFocusFirstItem
    const handleFocusLastItem = this.handleFocusLastItem

    const childrenMarkup = React.Children.map(children, (child, index) => {
      const itemRef = `item-${index}`
      return React.cloneElement(child, {
        ref: itemRef,
        isHover: hoverIndex === index,
        isFocused: this.isFocused && focusIndex === index,
        isSelected: selectedIndex === index,
        onBlur: handleItemOnBlur,
        onFocus: handleItemOnFocus,
        onMouseEnter: handleItemOnMouseEnter,
        onMouseLeave: handleItemOnMouseLeave,
        onMenuClose: handleItemOnMenuClose,
        onClickToOpenMenu: handleItemOnClickToOpenMenu,
        parentMenu: true
      })
    })

    const componentClassName = classNames(
      'c-DropdownMenu',
      className
    )

    const menuMarkup = isOpen ? (
      <div
        className={componentClassName}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        {...rest}
      >
        <KeypressListener keyCode={Keys.UP_ARROW} handler={handleUpArrow} type='keydown' />
        <KeypressListener keyCode={Keys.DOWN_ARROW} handler={handleDownArrow} type='keydown' />
        <KeypressListener keyCode={Keys.LEFT_ARROW} handler={handleLeftArrow} type='keydown' />
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
    ) : null

    return menuMarkup
  }
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps

export default Menu
