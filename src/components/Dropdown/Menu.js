import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import includes from 'lodash.includes'
import EventListener from '../EventListener'
import KeypressListener from '../KeypressListener'
import Animate from '../Animate'
import Card from '../Card'
import Drop from '../Drop'
import Scrollable from '../Scrollable'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { noop, requestAnimationFrame } from '../../utilities/other'

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

const dropOptions = {
  autoPosition: true,
  id: 'Dropdown',
  openOnArrowDown: true
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
    this.height = 0

    this.handleUpArrow = this.handleUpArrow.bind(this)
    this.handleDownArrow = this.handleDownArrow.bind(this)
    this.handleLeftArrow = this.handleLeftArrow.bind(this)
    this.handleRightArrow = this.handleRightArrow.bind(this)
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)
    this.handleOnResize = this.handleOnResize.bind(this)

    this.handleFocusItemNode = this.handleFocusItemNode.bind(this)
    this.handleItemOnBlur = this.handleItemOnBlur.bind(this)
    this.handleItemOnFocus = this.handleItemOnFocus.bind(this)
    this.handleItemOnMouseEnter = this.handleItemOnMouseEnter.bind(this)
    this.handleItemOnMouseLeave = this.handleItemOnMouseLeave.bind(this)
    this.handleItemOnMenuClose = this.handleItemOnMenuClose.bind(this)
    this.handleItemOnClickToOpenMenu = this.handleItemOnClickToOpenMenu.bind(this)
    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleOnMenuClick = this.handleOnMenuClick.bind(this)

    this.node = null
    this.wrapperNode = null
    this.contentNode = null
    this.listNode = null
  }

  componentDidMount () {
    this.mapRefsToItems()
    this.setMenuFocus()
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

  handleOnResize () {
    this.setHeight()
  }

  setHeight () {
    requestAnimationFrame(() => {
      const listNodeRect = this.listNode.getBoundingClientRect()
      const offset = 20
      let height
      if (listNodeRect.top + (listNodeRect.height + 2) > window.innerHeight) {
        height = window.innerHeight - listNodeRect.top - offset
      } else {
        height = null
      }

      if (height !== this.height) {
        this.contentNode.style.height = height ? `${height}px` : null
        this.height = height
      }
    })
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

  incrementFocusIndex (direction = 'up') {
    const { enableCycling } = this.props
    const { focusIndex } = this.state
    const itemCount = this.items.length - 1
    let newFocusIndex

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
      newFocusIndex = null
    }
    if (direction === 'start') {
      newFocusIndex = 0
    }

    this.setState({
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

  handleFocusItemNode () {
    if (!this.isFocused) return
    const { focusIndex } = this.state
    const focusItem = this.items[focusIndex]
    if (focusItem) {
      focusItem.node.scrollIntoView()
    }
  }

  handleItemOnBlur (event) {
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
    this.setState({ selectedIndex: null })
    onClose()
  }

  handleOnMenuClick (event) {
    event.stopPropagation()
  }

  render () {
    const {
      children,
      className,
      closePortal,
      enableCycling,
      isOpen,
      onClose,
      onFirstItemFocus,
      onLastItemFocus,
      parentMenu,
      selectedIndex: propsSelectedIndex,
      trigger,
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
    const handleOnMouseEnter = this.handleOnMouseEnter
    const handleOnMouseLeave = this.handleOnMouseLeave

    const handleItemOnBlur = this.handleItemOnBlur
    const handleItemOnFocus = this.handleItemOnFocus
    const handleItemOnMouseEnter = this.handleItemOnMouseEnter
    const handleItemOnMouseLeave = this.handleItemOnMouseLeave
    const handleItemOnMenuClose = this.handleItemOnMenuClose
    const handleItemOnClickToOpenMenu = this.handleItemOnClickToOpenMenu
    const handleOnClose = this.handleOnClose
    const handleOnResize = this.handleOnResize
    const handleOnMenuClick = this.handleOnMenuClick

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

    return (
      <div
        className='c-DropdownMenuWrapper'
        ref={node => { this.wrapperNode = node }}
      >
        <div
          className={componentClassName}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          ref={node => { this.node = node }}
          {...rest}
        >
          <EventListener event='resize' handler={handleOnResize} />
          <EventListener event='click' handler={handleOnMenuClick} scope={this.wrapperNode} />
          <KeypressListener keyCode={Keys.UP_ARROW} handler={handleUpArrow} type='keydown' />
          <KeypressListener keyCode={Keys.DOWN_ARROW} handler={handleDownArrow} type='keydown' />
          <KeypressListener keyCode={Keys.LEFT_ARROW} handler={handleLeftArrow} type='keydown' />
          <KeypressListener keyCode={Keys.RIGHT_ARROW} handler={handleRightArrow} type='keydown' />
          <KeypressListener keyCode={Keys.ESCAPE} handler={handleOnClose} />
          <Animate sequence='fadeIn down' in={isOpen} wait={0}>
            <Card seamless>
              <div
                className='c-DropdownMenu__content'
                ref={node => { this.contentNode = node }}
                style={{height: this.height}}
              >
                <Scrollable>
                  <ul
                    className='c-DropdownMenu__list'
                    ref={node => { this.listNode = node }}
                  >
                    {childrenMarkup}
                  </ul>
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

export default Drop(dropOptions)(Menu)
