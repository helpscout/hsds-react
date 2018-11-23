import * as React from 'react'
import { connect } from 'unistore/react'
import renderSpy from '@helpscout/react-utils/dist/renderSpy'
import propConnect from '../../PropProvider/propConnect'
import Animate from '../../Animate'
import EventListener from '../../EventListener'
import KeypressListener from '../../KeypressListener'
import Portal from '../../Portal'
import Menu from './Dropdown.Menu'
import Item from './Dropdown.Item'
import Renderer from './Dropdown.Renderer'
import {
  SELECTORS,
  isDropRight,
  getParentPath,
  getNextChildPath,
  renderRenderPropComponent,
  getItemProps,
} from './Dropdown.utils'
import {
  closeDropdown,
  setActiveItem,
  onSelect,
  focusItem,
  selectItem,
  onMenuMounted,
  onMenuUnmounted,
} from './Dropdown.actions'
import { MenuContainerUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { getComponentKey } from '../../../utilities/component'
import { isDefined } from '../../../utilities/is'
import { noop } from '../../../utilities/other'
import { namespaceComponent } from '../../../utilities/component'
import { scrollIntoView } from '../../../utilities/scrolling'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  animationDuration: number
  animationSequence: string
  activeIndex: string
  children?: (props: any) => void
  className?: string
  closeDropdown: () => void
  dropUp: boolean
  dropRight: boolean
  focusItem: (...args: any[]) => void
  id?: string
  isLoading: boolean
  onMenuMounted: () => void
  onMenuUnmounted: () => void
  onSelect: (...args: any[]) => void
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  items: Array<any>
  renderEmpty?: any
  renderLoading?: any
  selectItem: (...args: any[]) => void
  setActiveItem: (node: HTMLElement) => void
  triggerId?: string
  triggerNode?: HTMLElement
  zIndex: number
}

export class MenuContainer extends React.Component<Props> {
  static defaultProps = {
    animationDuration: 80,
    animationSequence: 'fade down',
    activeIndex: null,
    closeDropdown: noop,
    dropUp: false,
    dropRight: true,
    focusItem: noop,
    innerRef: noop,
    items: [],
    isOpen: true,
    isLoading: false,
    onMenuMounted: noop,
    onMenuUnmounted: noop,
    onSelect: noop,
    selectItem: noop,
    setActiveItem: noop,
    zIndex: 1080,
  }

  static contextTypes = {
    getState: noop,
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

    if (!isOpen) return

    switch (event.keyCode) {
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

      /* istanbul ignore next */
      default:
        break
    }
  }

  selectActiveItem = () => {
    this.props.onSelect()
  }

  setNextActiveItem = (nextActiveIndex: string) => {
    /* istanbul ignore if */
    if (!isDefined(nextActiveIndex)) return

    const nextActiveItem = this.node.querySelector(
      `[${SELECTORS.indexAttribute}="${nextActiveIndex}"]`
    ) as HTMLElement

    if (nextActiveItem) {
      this.props.setActiveItem(nextActiveItem)
      scrollIntoView(nextActiveItem)
    }
  }

  closeOnLastTab = () => {
    const { activeIndex, closeDropdown, isOpen, items } = this.props
    // This has been tested
    /* istanbul ignore if */
    if (!isOpen) return

    const isLastItem = parseInt(activeIndex, 10) === items.length - 1

    /* istanbul ignore else */
    if (isLastItem) {
      closeDropdown()
    }
  }

  closeSubMenu = () => {
    const { activeIndex, isOpen } = this.props
    if (!isOpen) return

    const nextActiveIndex = getParentPath(activeIndex)

    this.setNextActiveItem(nextActiveIndex)
  }

  openSubMenu = () => {
    const { activeIndex, isOpen } = this.props
    if (!isOpen) return

    const nextActiveIndex = getNextChildPath(activeIndex)

    this.setNextActiveItem(nextActiveIndex)
  }

  /* istanbul ignore next */
  // Skipping coverage for this method as it does almost exclusively DOM
  // calculations, which isn't a JSDOM's forte.
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
    const { dropRight, isOpen, items, id, triggerId } = this.props

    const shouldDropUp = this.shouldDropUp()

    return {
      dropRight,
      getItemProps: this.getItemProps,
      isOpen,
      items,
      id,
      triggerId,
      shouldDropUp,
    }
  }

  getItemProps = (item: any, index?: number) => {
    const state = this.context.getState()
    return getItemProps(state, item, index)
  }

  renderItems = () => {
    const { isLoading, renderEmpty, renderLoading } = this.props
    const { items } = this.getMenuProps()

    // Loading
    if (isLoading && renderLoading)
      return renderRenderPropComponent(renderLoading)
    // Empty
    if (!items.length && renderEmpty)
      return renderRenderPropComponent(renderEmpty)
    // Normal
    return items.map((item, index) => {
      return (
        <Item key={getComponentKey(item, index)} {...this.getItemProps(item)}>
          {item.label}
        </Item>
      )
    })
  }

  renderMenu = () => {
    const { id, triggerId } = this.getMenuProps()

    return (
      <Menu aria-labelledby={triggerId} id={id}>
        {this.renderItems()}
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

      /* istanbul ignore next */
      // Skipping coverage for this method as it does almost exclusively DOM
      // calculations, which isn't a JSDOM's forte.
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
      animationSequence,
      animationDuration,
      className,
      dropRight,
      focusItem,
      onMenuMounted,
      onMenuUnmounted,
      isOpen,
      selectItem,
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
          <Portal onOpen={onMenuMounted} onClose={onMenuUnmounted}>
            <div
              className="DropdownV2MenuContainerPlacementRoot"
              style={{ position: 'relative' }}
              ref={this.setPlacementNode}
            >
              <Renderer />
              <Animate
                sequence={shouldDropUp ? 'fade up' : animationSequence}
                in={isOpen}
                mountOnEnter={false}
                unmountOnExit={false}
                duration={animationDuration}
                timeout={animationDuration / 2}
              >
                <MenuContainerUI
                  className={componentClassName}
                  innerRef={this.setNodeRef}
                  onClick={selectItem}
                  onMouseMove={focusItem}
                  {...{
                    [SELECTORS.menuRootAttribute]: true,
                  }}
                >
                  {this.renderContent()}
                </MenuContainerUI>
              </Animate>
            </div>
          </Portal>
        )}
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY.MenuContainer)(MenuContainer)
const PropConnectedComponent = propConnect(COMPONENT_KEY.MenuContainer)(
  MenuContainer
)

const ConnectedMenuContainer: any = connect(
  // mapStateToProps
  (state: any) => {
    const {
      dropUp,
      isOpen,
      isLoading,
      items,
      menuId,
      renderEmpty,
      renderLoading,
      triggerId,
      triggerNode,
      zIndex,
    } = state

    return {
      dropUp,
      dropRight: isDropRight(state),
      isOpen,
      id: menuId,
      isLoading,
      items,
      renderEmpty,
      renderLoading,
      triggerId,
      triggerNode,
      zIndex,
    }
  },
  // mapDispatchToProps
  {
    closeDropdown,
    setActiveItem,
    onSelect,
    focusItem,
    selectItem,
    onMenuMounted,
    onMenuUnmounted,
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default renderSpy({ id: 'Dropdown.MenuContainer' })(
  ConnectedMenuContainer
)
