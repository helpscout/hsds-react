import * as React from 'react'
import { connect } from 'unistore/react'
import Animate from '../../Animate'
import EventListener from '../../EventListener'
import KeypressListener from '../../KeypressListener'
import Portal from '../../Portal'
import Menu from './Dropdown.Menu'
import Item from './Dropdown.Item'
import {
  SELECTORS,
  decrementPathIndex,
  incrementPathIndex,
  isDropRight,
  getParentPath,
  getNextChildPath,
} from './Dropdown.utils'
import { closeDropdown, setActiveItem } from './Dropdown.actions'
import { MenuContainerUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { getComponentKey } from '../../../utilities/component'
import { noop } from '../../../utilities/other'

export interface Props {
  animationDuration: number
  animationSequence: string
  activeIndex: string
  activeId?: string
  children?: (props: any) => void
  className?: string
  closeDropdown: () => void
  dropUp: boolean
  dropRight: boolean
  id?: string
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  items: Array<any>
  setActiveItem: (node: HTMLElement) => void
  triggerId?: string
  triggerNode?: HTMLElement
  zIndex: number
}

export class MenuContainer extends React.Component<Props> {
  static defaultProps = {
    animationDuration: 80,
    animationSequence: 'fade down',
    activeIndex: '0',
    closeDropdown: noop,
    dropUp: false,
    dropRight: true,
    innerRef: noop,
    items: [],
    isOpen: true,
    setActiveItem: noop,
    zIndex: 1080,
  }

  node: HTMLElement
  parentNode: HTMLElement
  placementNode: HTMLElement
  wrapperNode: HTMLElement

  componentDidMount() {
    this.setPositionStylesOnNode()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setPositionStylesOnNode()
    }
  }

  handleOnKeyDown = (event: KeyboardEvent) => {
    const { dropRight, isOpen } = this.props
    const amount = 1

    if (!isOpen) return

    switch (event.keyCode) {
      case Keys.UP_ARROW:
        event.preventDefault()
        this.goUp(amount)
        break

      case Keys.DOWN_ARROW:
        event.preventDefault()
        this.goDown(amount)
        break

      case Keys.LEFT_ARROW:
        event.preventDefault()
        if (dropRight) {
          this.closeSubMenu()
        } else {
          this.openSubMenu()
        }
        break

      case Keys.RIGHT_ARROW:
        event.preventDefault()
        if (dropRight) {
          this.openSubMenu()
        } else {
          this.closeSubMenu()
        }
        break

      case Keys.TAB:
        this.closeOnLastTab()
        break

      default:
        break
    }
  }

  setNextActiveItem = (nextActiveIndex: string) => {
    if (!nextActiveIndex) return

    const nextActiveItem = document.querySelector(
      `[${SELECTORS.indexAttribute}="${nextActiveIndex}"]`
    ) as HTMLElement

    if (nextActiveItem) {
      this.props.setActiveItem(nextActiveItem)
      nextActiveItem.focus()
    }
  }

  goUp = (amount: number = 1) => {
    const { activeIndex } = this.props
    if (!activeIndex) return

    const nextActiveIndex = decrementPathIndex(activeIndex, amount)

    this.setNextActiveItem(nextActiveIndex)
  }

  goDown = (amount: number = 1) => {
    const { activeIndex: currentActiveIndex } = this.props
    // Allows for initial selection of first item (index 0)
    const activeIndex = currentActiveIndex || '-1'

    const nextActiveIndex = incrementPathIndex(activeIndex, amount)

    this.setNextActiveItem(nextActiveIndex)
  }

  closeOnLastTab = () => {
    const { activeIndex, closeDropdown, items } = this.props
    const isLastItem = parseInt(activeIndex, 10) === items.length - 1

    if (isLastItem) {
      closeDropdown()
    }
  }

  closeSubMenu = () => {
    const { activeIndex } = this.props
    const nextActiveIndex = getParentPath(activeIndex)

    this.setNextActiveItem(nextActiveIndex)
  }

  openSubMenu = () => {
    const { activeIndex } = this.props
    const nextActiveIndex = getNextChildPath(activeIndex)

    this.setNextActiveItem(nextActiveIndex)
  }

  shouldDropUp = (): boolean => {
    if (this.props.dropUp) return true
    if (!this.node || !this.wrapperNode) return false

    const { top } = this.wrapperNode.getBoundingClientRect()
    const { clientHeight: height } = this.node

    const hasWindowBottomOverflow = top + height > window.innerHeight
    const hasWindowTopOverflow = top - height < 0

    return hasWindowBottomOverflow && !hasWindowTopOverflow
  }

  getMenuProps = () => {
    const { activeId, dropRight, isOpen, items, id, triggerId } = this.props

    const shouldDropUp = this.shouldDropUp()

    return {
      activeId,
      dropRight,
      isOpen,
      items,
      id,
      triggerId,
      shouldDropUp,
    }
  }

  renderMenu = () => {
    const { activeId, items, id, triggerId } = this.getMenuProps()

    return (
      <Menu
        aria-activedescendant={activeId}
        aria-labelledby={triggerId}
        id={id}
      >
        {items.map((item, index) => (
          <Item key={getComponentKey(item, index)} {...item}>
            {item.label}
          </Item>
        ))}
      </Menu>
    )
  }

  renderContent = () => {
    const { children } = this.props

    if (children) {
      return children(this.getMenuProps())
    }

    return this.renderMenu()
  }

  getStylePosition = (): any => {
    const { triggerNode } = this.props
    const defaultProps = { top: '0', left: '0' }
    if (!this.wrapperNode) return defaultProps

    const targetNode = triggerNode || this.wrapperNode

    const rect = targetNode.getBoundingClientRect()
    const { height, top, left } = rect

    return {
      left,
      top: top + height,
    }
  }

  setPositionStylesOnNode = () => {
    const { triggerNode, zIndex } = this.props

    // There's some... unexplainable weirdness in the timing of
    // getBoundingClientRect. The top is accurate pre-requestAnimationFrame.
    // Because of this, we'll grab the top first...
    const { top } = this.getStylePosition()

    requestAnimationFrame(() => {
      if (!this.node || !this.placementNode) return
      // ...then get the left.
      const { left } = this.getStylePosition()

      this.placementNode.style.position = 'fixed'
      this.placementNode.style.top = `${top}px`
      this.placementNode.style.left = `${left}px`
      this.placementNode.style.zIndex = `${zIndex}`

      if (triggerNode) {
        this.placementNode.style.width = `${triggerNode.clientWidth}px`
      }

      if (this.shouldDropUp()) {
        this.node.classList.add('is-dropUp')
        if (triggerNode) {
          this.placementNode.style.marginTop = `-${triggerNode.clientHeight}px`
        }
      } else {
        this.node.classList.remove('is-dropUp')
      }
    })
  }

  setNodeRef = node => {
    if (node) {
      this.node = node
      this.parentNode = node.parentElement
    }

    this.props.innerRef(node)
  }

  setWrapperNode = node => (this.wrapperNode = node)
  setPlacementNode = node => (this.placementNode = node)

  render() {
    const {
      animationDuration,
      animationSequence,
      className,
      dropRight,
      isOpen,
    } = this.props
    const shouldDropUp = this.shouldDropUp()

    const componentClassName = classNames(
      'c-DropdownV2MenuContainer',
      shouldDropUp && 'is-dropUp',
      !dropRight && 'is-dropLeft',
      className
    )

    return (
      <div className="DropdownV2MenuContainerRoot" ref={this.setWrapperNode}>
        <EventListener event="resize" handler={this.setPositionStylesOnNode} />
        <KeypressListener handler={this.handleOnKeyDown} type="keydown" />
        {isOpen && (
          <Portal>
            <div
              className="DropdownV2MenuContainerPlacementRoot"
              style={{ position: 'relative' }}
              ref={this.setPlacementNode}
            >
              <MenuContainerUI
                className={componentClassName}
                innerRef={this.setNodeRef}
              >
                <Animate
                  sequence={shouldDropUp ? 'fade up' : animationSequence}
                  in={isOpen}
                  mountOnEnter={false}
                  unmountOnExit={false}
                  duration={animationDuration}
                  timeout={animationDuration / 2}
                >
                  {this.renderContent()}
                </Animate>
              </MenuContainerUI>
            </div>
          </Portal>
        )}
      </div>
    )
  }
}

const ConnectedMenuContainer: any = connect(
  // mapStateToProps
  (state: any) => {
    const {
      activeIndex,
      activeId,
      dropUp,
      isOpen,
      menuId,
      triggerId,
      triggerNode,
      zIndex,
    } = state

    return {
      activeIndex,
      activeId,
      dropUp,
      dropRight: isDropRight(state),
      isOpen,
      id: menuId,
      triggerId,
      triggerNode,
      zIndex,
    }
  },
  // mapDispatchToProps
  {
    closeDropdown,
    setActiveItem,
  }
)(
  // @ts-ignore
  MenuContainer
)

export default ConnectedMenuContainer
