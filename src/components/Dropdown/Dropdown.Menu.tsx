import * as React from 'react'
import enhanceComponentMethod from '@helpscout/react-utils/dist/enhanceComponentMethod'
import Item from './Dropdown.Item'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import Animate from '../Animate'
import Card from '../Card'
import Drop from '../Drop'
import Scrollable from '../Scrollable'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { incrementFocusIndex } from '../../utilities/focus'
import { noop, requestAnimationFrame } from '../../utilities/other'
import { applyStylesToNode, isNodeScrollable } from '../../utilities/node'
import { getHeightRelativeToViewport } from '../../utilities/nodePosition'
import { DropdownDirection } from './Dropdown.types'

interface DropdownProps {
  children?: any
  className?: string
  closeMenuOnClick: boolean
  closePortal: () => void
  enableCycling: boolean
  enableTabNavigation: boolean
  isOpen: boolean
  onBeforeClose: () => void
  onBeforeOpen: () => void
  onClose: () => void
  onOpen: () => void
  onSelect: () => void
  selectedIndex: number
  trigger?: HTMLElement
}

interface DropDownState {
  focusIndex?: number
  hoverIndex?: number | null
}

const dropOptions = {
  autoPosition: true,
  id: 'Dropdown',
  openOnArrowDown: true,
  timeout: 0,
}

class Menu extends React.PureComponent<DropdownProps, DropDownState> {
  static defaultProps = {
    closeMenuOnClick: true,
    enableCycling: false,
    enableTabNavigation: false,
    isOpen: false,
    onClose: noop,
    onOpen: noop,
    onSelect: noop,
  }
  // static contextTypes = {
  //   parentMenu: PropTypes.element,
  //   parentMenuClose: PropTypes.func,
  // }

  items: Array<any> = []
  isFocused: boolean = false
  height: number | null = null

  node: HTMLElement | null = null
  wrapperNode: HTMLElement | null = null
  contentNode: HTMLElement | null = null
  scrollableNode: HTMLElement | null = null
  listNode: HTMLElement | null = null
  _isMounted: boolean = false

  constructor(props) {
    super(props)

    this.state = {
      focusIndex:
        typeof props.selectedIndex === 'number' ? props.selectedIndex : null,
      hoverIndex: null,
    }
    this.items = []
    this.isFocused = props.isOpen ? props.isOpen : false
    this.height = null

    this.handleTab = this.handleTab.bind(this)
    this.handleShiftTab = this.handleShiftTab.bind(this)
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
  }

  componentDidMount = () => {
    this.mapRefsToItems()
    this.setMenuFocus()
    this._isMounted = true
    requestAnimationFrame(() => {
      this.handleOnResize()
    })
  }

  componentWillUpdate(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.mapRefsToItems()
      this.isFocused = nextProps.isOpen
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.mapRefsToItems()
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  safeSetState(newState: Object) {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(newState)
    }
  }

  handleOnResize = () => {
    const height = getHeightRelativeToViewport({
      node: this.listNode,
      offset: 20,
    })

    if (height !== this.height) {
      // Direct DOM manipulation to avoid component re-render from state change
      applyStylesToNode(this.contentNode, { height })
      // TODO: fix typescript complains
      // @ts-ignore
      this.height = height
    }
  }

  setMenuFocus = () => {
    this.isFocused = true
  }

  mapRefsToItems = () => {
    this.items = []
    Object.keys(this.refs).forEach((key, index) => {
      /* istanbul ignore else */
      if (key.indexOf('item-') >= 0) {
        const item = this.refs[key]
        this.items.push(item)
      }
    })
  }

  getIndexFromItem = (item: any) => {
    return item.props.itemIndex
  }

  incrementFocusIndex = (direction: DropdownDirection) => {
    const { enableCycling } = this.props
    const { focusIndex } = this.state
    const itemCount = this.items.length - 1

    const newFocusIndex = incrementFocusIndex({
      currentIndex: focusIndex,
      direction,
      enableCycling,
      itemCount,
    })

    this.safeSetState({
      focusIndex: newFocusIndex,
      hoverIndex: null,
    })
  }

  handleTab = (event: KeyboardEvent) => {
    if (!this.props.enableTabNavigation) return
    this.handleDownArrow(event)
  }

  handleShiftTab = (event: KeyboardEvent) => {
    if (!this.props.enableTabNavigation) return
    this.handleUpArrow(event)
  }

  handleUpArrow = (event: KeyboardEvent) => {
    event.preventDefault && event.preventDefault()
    if (!this.isFocused) return
    this.incrementFocusIndex('up')
    this.handleFocusItemNode()
  }

  handleDownArrow = (event: KeyboardEvent) => {
    event.preventDefault && event.preventDefault()
    if (!this.isFocused) return
    this.incrementFocusIndex('down')
    this.handleFocusItemNode()
  }

  handleLeftArrow = (event: KeyboardEvent) => {
    event.preventDefault && event.preventDefault()
    if (!this.isFocused) return
    const { parentMenu } = this.context
    if (parentMenu) {
      this.handleOnClose()
    }
  }

  handleRightArrow = (event: KeyboardEvent) => {
    event.preventDefault && event.preventDefault()
    const { focusIndex } = this.state
    if (!this.isFocused) return

    if (focusIndex === null || focusIndex === undefined) return

    const item = this.items[focusIndex]
    if (item && item.menu) {
      this.safeSetState({ hoverIndex: focusIndex })
      this.isFocused = false
    }
  }

  handleEscape = (event: KeyboardEvent) => {
    this.handleOnClose()
  }

  handleFocusItemNode = () => {
    /* istanbul ignore if */
    // Tested, but not being picked up by Istanbul
    if (!this.isFocused) return
    const { focusIndex } = this.state
    if (typeof focusIndex !== 'number') return

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

  handleItemOnClick = () => {
    const { closeMenuOnClick } = this.props

    if (!closeMenuOnClick) return
    this.handleOnCloseParent()
  }

  handleItemOnFocus = (event: Event, reactEvent: Event, item: any) => {
    const focusIndex = this.getIndexFromItem(item)
    this.safeSetState({ focusIndex })
  }

  handleItemOnMouseEnter = (event: Event, reactEvent: Event, item: any) => {
    const focusIndex = this.getIndexFromItem(item)
    const hoverIndex = focusIndex
    this.safeSetState({ focusIndex, hoverIndex })
    if (item.menu) {
      this.isFocused = false
    }
  }

  handleItemOnMenuClose = () => {
    /* istanbul ignore else */
    if (this._isMounted) {
      this.isFocused = true
      this.safeSetState({ hoverIndex: null })
    }
  }

  handleOnClose = () => {
    this.props.onClose()
  }

  handleOnCloseParent = () => {
    const { parentMenuClose } = this.context
    this.handleOnClose()

    if (parentMenuClose) {
      parentMenuClose()
    }
  }

  handleOnMenuClick = event => {
    event.stopPropagation()
  }

  render() {
    const {
      children,
      className,
      closePortal,
      closeMenuOnClick,
      enableCycling,
      enableTabNavigation,
      // TODO: fix typescript complains
      // @ts-ignore
      forceClosePortal,
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

    const { focusIndex, hoverIndex } = this.state

    const { parentMenu } = this.context

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

      return child.type === Item
        ? React.cloneElement(child, {
            enableTabNavigation,
            ref: itemRef,
            itemIndex: index,
            isOpen: hoverIndex === index,
            isHover: hoverIndex === index,
            isFocused: focusIndex === index,
            onFocus: handleItemOnFocus,
            onClick: enhanceComponentMethod(child, 'onClick')(
              handleItemOnClick
            ),
            onMouseEnter: handleItemOnMouseEnter,
            onMenuClose: handleItemOnMenuClose,
            onParentMenuClose: handleOnCloseParent,
            onSelect,
          })
        : child
    })

    const componentClassName = classNames(
      'c-DropdownMenu',
      parentMenu && 'is-sub-menu',
      className
    )

    return (
      <div
        className="c-DropdownMenuWrapper"
        ref={node => {
          this.wrapperNode = node
        }}
        onClick={handleOnMenuClick}
      >
        <div
          className={componentClassName}
          ref={node => {
            this.node = node
          }}
          {...rest}
        >
          <EventListener event="resize" handler={handleOnResize} />
          <KeypressListener
            keyCode={Keys.TAB}
            handler={this.handleTab}
            noModifier
            type="keydown"
          />
          <KeypressListener
            keyCode={Keys.TAB}
            modifier="shift"
            handler={this.handleShiftTab}
            type="keydown"
          />
          <KeypressListener
            keyCode={Keys.UP_ARROW}
            handler={handleUpArrow}
            type="keydown"
          />
          <KeypressListener
            keyCode={Keys.DOWN_ARROW}
            handler={handleDownArrow}
            type="keydown"
          />
          <KeypressListener
            keyCode={Keys.LEFT_ARROW}
            handler={handleLeftArrow}
            type="keydown"
          />
          <KeypressListener
            keyCode={Keys.RIGHT_ARROW}
            handler={handleRightArrow}
            type="keydown"
          />
          <KeypressListener keyCode={Keys.ESCAPE} handler={handleEscape} />
          <Animate sequence="fade down" in={isOpen} duration={160} timeout={80}>
            <Card seamless floating>
              <div
                className="c-DropdownMenu__content"
                ref={node => {
                  this.contentNode = node
                }}
                style={{ height: this.height || undefined }}
              >
                <Scrollable
                  scrollableRef={node => {
                    this.scrollableNode = node
                  }}
                >
                  <div
                    className="c-DropdownMenu__list"
                    ref={node => {
                      this.listNode = node
                    }}
                    role="menu"
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

export const MenuComponent = Menu

// TODO: fix typescript complains
// @ts-ignore
export default Drop(dropOptions)(Menu)
