import * as React from 'react'
import { connect } from 'unistore/react'
import propConnect from '../../PropProvider/propConnect'
import Animate from '../../Animate'
import EventListener from '../../EventListener'
import Portal from '../../Portal'
import Card from './Dropdown.Card'
import Menu from './Dropdown.Menu'
import Group from './Dropdown.Group'
import Item from './Dropdown.Item'
import Renderer from './Dropdown.Renderer'
import {
  SELECTORS,
  isDropRight,
  getItemProps,
  hasGroups,
} from './Dropdown.utils'
import {
  closeDropdown,
  focusItem,
  selectItem,
  onMenuMounted,
  onMenuUnmounted,
} from './Dropdown.actions'
import { MenuContainerUI } from './Dropdown.css.js'
import { classNames } from '../../../utilities/classNames'
import { renderRenderPropComponent } from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { namespaceComponent } from '../../../utilities/component'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  animationDuration: number
  animationSequence: string
  children?: (props: any) => void
  className?: string
  closeDropdown: () => void
  dropUp: boolean
  dropRight: boolean
  focusItem: (...args: any[]) => void
  getState: (...args: any[]) => void
  id?: string
  isLoading: boolean
  onMenuMounted: () => void
  onMenuUnmounted: () => void
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  items: Array<any>
  renderEmpty?: any
  renderLoading?: any
  selectItem: (...args: any[]) => void
  triggerId?: string
  triggerNode?: HTMLElement
  zIndex: number
}

export class MenuContainer extends React.Component<Props> {
  static defaultProps = {
    animationDuration: 80,
    animationSequence: 'fade down',
    closeDropdown: noop,
    dropUp: false,
    dropRight: true,
    getState: noop,
    focusItem: noop,
    innerRef: noop,
    items: [],
    isOpen: true,
    isLoading: false,
    onMenuMounted: noop,
    onMenuUnmounted: noop,
    selectItem: noop,
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
      renderItemsAsGroups: this.renderItemsAsGroups,
      renderItems: this.renderItems,
      hasGroups: this.hasGroups(),
      isOpen,
      items,
      id,
      triggerId,
      shouldDropUp,
    }
  }

  hasGroups = () => {
    return hasGroups(this.props.items)
  }

  getItemProps = (item: any, index?: number) => {
    const state = this.props.getState()
    const props = getItemProps(state, item, index)

    return props
  }

  renderItemsAsGroups = ({
    /* istanbul ignore next */
    id = 'group',
    items,
    withIndex,
  }) => {
    let groupStartIndex = 0

    return items.map((group, index) => {
      const { items, ...groupProps } = group
      const groupId = `${id}-group-${index}`
      const groupHeaderId = `${id}-group-${index}-header`

      if (!items.length) return

      const groupedItemsMarkup = (
        <Group key={groupId} id={groupId} aria-labelledby={groupHeaderId}>
          <Item {...groupProps} id={groupHeaderId} />
          {items.map((item, index) => {
            /* istanbul ignore next */
            const indexProp = withIndex ? index + groupStartIndex : undefined

            return (
              <Item {...this.getItemProps(item, indexProp)} id={groupHeaderId}>
                {item.label}
              </Item>
            )
          })}
        </Group>
      )

      // This ensures that the set(s) have the current path index.
      // This is especially important if the groups are filtered.
      groupStartIndex += items.length

      return groupedItemsMarkup
    })
  }

  renderItems = ({
    items,
    withIndex,
  }: {
    items: Array<any>
    withIndex?: boolean
  }) => {
    return items.map((item, index) => {
      /* istanbul ignore next */
      const indexProp = withIndex ? index : undefined
      return <Item {...this.getItemProps(item, indexProp)}>{item.label}</Item>
    })
  }

  renderMenuItems = () => {
    const { id, isLoading, renderEmpty, renderLoading } = this.props
    const { items } = this.getMenuProps()

    // Loading
    if (isLoading && renderLoading)
      return renderRenderPropComponent(renderLoading)
    // Empty
    if (!items.length && renderEmpty)
      return renderRenderPropComponent(renderEmpty)
    // Groups
    if (this.hasGroups())
      return this.renderItemsAsGroups({ items, id, withIndex: false })
    // Normal
    return this.renderItems({ items })
  }

  renderMenu = () => {
    const { id, triggerId } = this.getMenuProps()

    return (
      <Card>
        <Menu aria-labelledby={triggerId} id={id}>
          {this.renderMenuItems()}
        </Menu>
      </Card>
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
      this.placementNode.style.top = `${Math.round(top)}px`
      this.placementNode.style.left = `${Math.round(left)}px`
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
    /* istanbul ignore else */
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
      getState,
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
      getState,
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
    focusItem,
    selectItem,
    onMenuMounted,
    onMenuUnmounted,
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedMenuContainer
