import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash.includes'
import Item from './Item'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import Animate from '../Animate'
import Card from '../Card'
import Drop from '../Drop'
import Scrollable from '../Scrollable'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { incrementFocusIndex } from '../../utilities/focus'
import { noop } from '../../utilities/other'
import {
  applyStylesToNode,
  isNodeScrollable
} from '../../utilities/node'
import { getHeightRelativeToViewport } from '../../utilities/nodePosition'

export const propTypes = {
  closeMenuOnClick: PropTypes.bool,
  enableCycling: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onSelect: PropTypes.func,
  selectedIndex: PropTypes.number
}

const defaultProps = {
  closeMenuOnClick: true,
  enableCycling: false,
  isOpen: false,
  onClose: noop,
  onOpen: noop,
  onSelect: noop
}

const contextTypes = {
  parentMenu: PropTypes.element,
  parentMenuClose: PropTypes.func
}

const dropOptions = {
  autoPosition: true,
  id: 'Dropdown',
  openOnArrowDown: true,
  timeout: 0
}

class Menu extends Component {
  constructor (props) {
    super()
    this.state = {
      focusIndex: props.selectedIndex !== undefined ? props.selectedIndex : null,
      hoverIndex: null
    }
    this.items = []
    this.isFocused = props.isOpen ? props.isOpen : false
    this.height = null

    this.handleUpArrow = this.handleUpArrow.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleLeftArrow = this.handleLeftArrow.bind(this)
    this.handleRightArrow = this.handleRightArrow.bind(this)
    this.handleEscape = this.handleEscape.bind(this)
    this.handleOnResize = this.handleOnResize.bind(this)

    this.handleFocusItemNode = this.handleFocusItemNode.bind(this)
    this.handleItemOnClick = this.handleItemOnClick.bind(this)
    this.handleItemOnFocus = this.handleItemOnFocus.bind(this)
    this.handleItemOnMouseEnter = this.handleItemOnMouseEnter.bind(this)
    this.handleItemOnMenuClose = this.handleItemOnMenuClose.bind(this)
    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleOnCloseParent = this.handleOnCloseParent.bind(this)
    this.handleOnMenuClick = this.handleOnMenuClick.bind(this)

    this.node = null
    this.wrapperNode = null
    this.contentNode = null
    this.scrollableNode = null
    this.listNode = null
    // https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    this._isMounted = false
  }

  componentDidMount () {
    this.mapRefsToItems()
    this.setMenuFocus()
    this._isMounted = true
    setTimeout(() => {
      this.handleOnResize()
    }, 0)
  }

  componentWillUpdate (nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.mapRefsToItems()
      this.isFocused = nextProps.isOpen
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.mapRefsToItems()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  safeSetState (newState) {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(newState)
    }
  }

  handleOnResize () {
    const height = getHeightRelativeToViewport({
      node: this.listNode,
      offset: 20
    })

    if (height !== this.height) {
      // Direct DOM manipulation to avoid component re-render from state change
      applyStylesToNode(this.contentNode, { height })
      this.height = height
    }
  }

  setMenuFocus () {
    this.isFocused = true
  }

  mapRefsToItems () {
    this.items = []
    Object.keys(this.refs).forEach((key, index) => {
      /* istanbul ignore else */
      if (includes(key, 'item-')) {
        const item = this.refs[key]
        this.items.push(item)
      }
    })
  }

  getIndexFromItem (item) {
    return item.props.itemIndex
  }

  incrementFocusIndex (direction) {
    const { enableCycling } = this.props
    const { focusIndex } = this.state
    const itemCount = this.items.length - 1

    const newFocusIndex = incrementFocusIndex({
      currentIndex: focusIndex,
      direction,
      enableCycling,
      itemCount
    })

    this.safeSetState({
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
    const { parentMenu } = this.context
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
    if (item && item.menu) {
      this.safeSetState({ hoverIndex: focusIndex })
      this.isFocused = false
    }
  }

  handleEscape (event) {
    this.handleOnClose()
  }

  handleFocusItemNode () {
    /* istanbul ignore if */
    // Tested, but not being picked up by Istanbul
    if (!this.isFocused) return
    const { focusIndex } = this.state
    const focusItem = this.items[focusIndex]
    if (focusItem) {
      const node = focusItem.node
      node.focus()
      /* istanbul ignore next */
      // Cannot be tested in JSDOM, due to lack of scrollHeight DOM API
      if (isNodeScrollable(this.scrollableNode)) {
        /* istanbul ignore next */
        // Scrolling does not exist in JSDOM
        node.scrollIntoView()
      }
    }
  }

  handleItemOnClick () {
    const { closeMenuOnClick } = this.props

    if (!closeMenuOnClick) return
    this.handleOnCloseParent()
  }

  handleItemOnFocus (event, reactEvent, item) {
    const focusIndex = this.getIndexFromItem(item)
    this.safeSetState({ focusIndex })
  }

  handleItemOnMouseEnter (event, reactEvent, item) {
    const focusIndex = this.getIndexFromItem(item)
    const hoverIndex = focusIndex
    this.safeSetState({ focusIndex, hoverIndex })
    if (item.menu) {
      this.isFocused = false
    }
  }

  handleItemOnMenuClose () {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.isFocused = true
      this.safeSetState({ hoverIndex: null })
    }
  }

  handleOnClose () {
    const { onClose } = this.props
    onClose()
  }

  handleOnCloseParent () {
    const { parentMenuClose } = this.context
    this.handleOnClose()

    if (parentMenuClose) {
      parentMenuClose()
    }
  }

  handleOnMenuClick (event) {
    event.stopPropagation()
  }

  render () {
    const {
      children,
      className,
      closePortal,
      closeMenuOnClick,
      enableCycling,
      isOpen,
      onBeforeClose,
      onBeforeOpen,
      onClose,
      onOpen,
      onSelect,
      selectedIndex,
      trigger,
      ...rest
    } = this.props

    const {
      focusIndex,
      hoverIndex
    } = this.state

    const {
      parentMenu
    } = this.context

    const handleUpArrow = this.handleUpArrow
    const handleDownArrow = this.handleDownArrow
    const handleLeftArrow = this.handleLeftArrow
    const handleRightArrow = this.handleRightArrow
    const handleEscape = this.handleEscape
    const handleOnCloseParent = this.handleOnCloseParent

    const handleItemOnClick = this.handleItemOnClick
    const handleItemOnFocus = this.handleItemOnFocus
    const handleItemOnMouseEnter = this.handleItemOnMouseEnter
    const handleItemOnMenuClose = this.handleItemOnMenuClose
    const handleOnResize = this.handleOnResize
    const handleOnMenuClick = this.handleOnMenuClick

    let itemIndexCounter = -1
    const childrenMarkup = React.Children.map(children, child => {
      if (child.type === Item) {
        itemIndexCounter++
      }
      const index = itemIndexCounter
      const itemRef = `item-${index}`

      return child.type === Item ? React.cloneElement(child, {
        ref: itemRef,
        itemIndex: index,
        isOpen: hoverIndex === index,
        isHover: hoverIndex === index,
        isFocused: focusIndex === index,
        onFocus: handleItemOnFocus,
        onClick: () => {
          child.props.onClick()
          handleItemOnClick()
        },
        onMouseEnter: handleItemOnMouseEnter,
        onMenuClose: handleItemOnMenuClose,
        onParentMenuClose: handleOnCloseParent,
        onSelect
      }) : child
    })

    const componentClassName = classNames(
      'c-DropdownMenu',
      parentMenu && 'is-sub-menu',
      className
    )

    return (
      <div
        className='c-DropdownMenuWrapper'
        ref={node => { this.wrapperNode = node }}
        onClick={handleOnMenuClick}
      >
        <div
          className={componentClassName}
          ref={node => { this.node = node }}
          {...rest}
        >
          <EventListener event='resize' handler={handleOnResize} />
          <KeypressListener keyCode={Keys.UP_ARROW} handler={handleUpArrow} type='keydown' />
          <KeypressListener keyCode={Keys.DOWN_ARROW} handler={handleDownArrow} type='keydown' />
          <KeypressListener keyCode={Keys.LEFT_ARROW} handler={handleLeftArrow} type='keydown' />
          <KeypressListener keyCode={Keys.RIGHT_ARROW} handler={handleRightArrow} type='keydown' />
          <KeypressListener keyCode={Keys.ESCAPE} handler={handleEscape} />
          <Animate sequence='fade downSmall' in={isOpen} duration={160}>
            <Card seamless floating>
              <div
                className='c-DropdownMenu__content'
                ref={node => { this.contentNode = node }}
                style={{height: this.height}}
              >
                <Scrollable
                  scrollableRef={node => { this.scrollableNode = node }}
                >
                  <div
                    className='c-DropdownMenu__list'
                    ref={node => { this.listNode = node }}
                    role='menu'
                  >
                    {childrenMarkup}
                  </div>
                </Scrollable>
              </div>
            </Card>
          </Animate>
        </div>
      </div>
    )
  }
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps
Menu.contextTypes = contextTypes

export const MenuComponent = Menu
export default Drop(dropOptions)(Menu)
