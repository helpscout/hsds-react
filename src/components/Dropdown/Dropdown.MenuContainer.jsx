// Deprecated
/* istanbul ignore file */
import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from '@helpscout/wedux'
import isNil from 'lodash.isnil'
import get from 'lodash.get'
import Animate from '../Animate'
import Card from './Dropdown.Card'
import Menu from './Dropdown.Menu'
import MenuPortal from './Dropdown.MenuPortal'
import DropdownGroup from './Dropdown.Group'
import Item from './Dropdown.Item'
import Renderer from './Dropdown.Renderer'
import {
  SELECTORS,
  getItemProps,
  hasGroups,
  isDropRight,
} from './Dropdown.utils'
import {
  closeDropdown,
  focusItem,
  onMenuMounted,
  onMenuReposition,
  onMenuUnmounted,
  selectItem,
  clearSelection,
} from './Dropdown.actions'
import { MenuContainerUI } from './Dropdown.css.js'
import classNames from 'classnames'
import getShallowDiffs from '@helpscout/react-utils/dist/getShallowDiffs'
import { renderRenderPropComponent } from './Dropdown.utils'
import { createUniqueIDFactory } from '../../utilities/id'
import { getComputedClientRect } from './Dropdown.MenuContainer.utils'

function noop() {}

const uniqueID = createUniqueIDFactory('DropdownMenuContainer')
const clearerID = createUniqueIDFactory('hsds-dropdown-theallclearer')

const shallowEqual = function shallowEqual(newValue, oldValue) {
  return newValue === oldValue
}

const simpleIsEqual = function simpleIsEqual(newArgs, lastArgs) {
  return (
    newArgs.length === lastArgs.length &&
    newArgs.every(function (newArg, index) {
      return shallowEqual(newArg, lastArgs[index])
    })
  )
}

export function memoizeOne(resultFn, isEqual) {
  if (isEqual === void 0) {
    isEqual = simpleIsEqual
  }

  let lastThis
  let lastArgs = []
  let lastResult
  let calledOnce = false

  var result = function result() {
    for (
      var _len = arguments.length, newArgs = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      newArgs[_key] = arguments[_key]
    }

    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult
    }

    lastResult = resultFn.apply(this, newArgs)
    calledOnce = true

    lastThis = this

    lastArgs = newArgs
    return lastResult
  }

  return result
}
export const shallowPropMemoizeIsEqual = (a, b) => {
  return !getShallowDiffs(a[0], b[0]).diffs.length
}
export const memoizeWithProps = fn => memoizeOne(fn, shallowPropMemoizeIsEqual)

export class MenuContainer extends React.PureComponent {
  id = uniqueID()
  didOpen = false
  node
  parentNode
  placementNode
  wrapperNode
  memoSetPositionStylesOnNode
  positionRAF = null

  componentDidMount() {
    this.memoSetPositionStylesOnNode = memoizeWithProps(
      this.setPositionStylesOnNode
    )
    this.updateMenuNodePosition()
  }

  componentWillUnmount() {
    this.forceHideMenuNode()
  }

  // Skipping coverage for this method as it does almost exclusively DOM
  // calculations, which isn't a JSDOM's forte.
  shouldDropUp() {
    const { contentWindow, dropUp } = this.props
    // Always return true, if dropUp
    if (dropUp) return true

    if (!this.node || !this.wrapperNode) return false

    const { top } = this.wrapperNode.getBoundingClientRect()
    const { clientHeight: height } = this.node

    const hasWindowBottomOverflow = top + height > contentWindow.innerHeight
    const hasWindowTopOverflow = top - height < 0

    if (hasWindowBottomOverflow) {
      return !hasWindowTopOverflow
    }
    return false
  }

  shouldDropDirectionUpdate(positionProps) {
    if (!this.didOpen) return true

    return this.props.shouldDropDirectionUpdate({
      ...positionProps,
      dropUp: this.props.dropUp,
    })
  }

  getMenuProps() {
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

  hasGroups() {
    return hasGroups(this.props.items)
  }

  getItemProps = (item, index) => {
    const state = this.props.getState()
    const props = getItemProps(state, item, index)

    return props
  }

  renderItemsAsGroups = ({ id = 'group', items, withIndex }) => {
    let groupStartIndex = 0

    return items.map((group, index) => {
      const { items, ...groupProps } = group
      const groupId = `${id}-group-${index}`
      const groupHeaderId = `${id}-group-${index}-header`

      if (!items.length) return null

      const groupedItemsMarkup = (
        <DropdownGroup
          key={groupId}
          id={groupId}
          aria-labelledby={groupHeaderId}
        >
          <Item {...groupProps} id={groupHeaderId} />
          {items.map((item, index) => {
            const indexProp = withIndex ? index + groupStartIndex : undefined

            return (
              <Item {...this.getItemProps(item, indexProp)} id={groupHeaderId}>
                {item.label}
              </Item>
            )
          })}
        </DropdownGroup>
      )

      // This ensures that the set(s) have the current path index.
      // This is especially important if the groups are filtered.
      groupStartIndex += items.length

      return groupedItemsMarkup
    })
  }

  renderItems = ({ items, withIndex }) => {
    const {
      allowMultipleSelection,
      clearSelection,
      focusItem,
      selectionClearer,
    } = this.props

    if (allowMultipleSelection && selectionClearer) {
      const clearerItem = {
        value: selectionClearer,
        id: clearerID(),
        label: '',
      }

      return [clearerItem].concat(items).map((item, index) => {
        const indexProp = withIndex ? index : undefined
        const itemProps = this.getItemProps(item, indexProp)

        if (item.id === clearerItem.id) {
          return (
            <div key={clearerItem.id}>
              <Item
                {...itemProps}
                onMouseMove={focusItem}
                onClick={clearSelection}
                isSelectionClearer
              />
              <Item type="divider" />
            </div>
          )
        }

        return <Item {...itemProps}>{item.label}</Item>
      })
    }

    return items.map((item, index) => {
      const indexProp = withIndex ? index : undefined

      return <Item {...this.getItemProps(item, indexProp)}>{item.label}</Item>
    })
  }

  renderMenuItems() {
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

  renderMenu() {
    const { id, triggerId } = this.getMenuProps()

    return (
      <Card>
        <Menu aria-labelledby={triggerId} id={id}>
          {this.renderMenuItems()}
        </Menu>
      </Card>
    )
  }

  renderContent() {
    const { children } = this.props

    if (children) {
      return children(this.getMenuProps())
    }

    return this.renderMenu()
  }

  getTargetNode = () => {
    return this.props.triggerNode || this.wrapperNode
  }

  getStylePosition = () => {
    const { contentWindow } = this.props
    const targetNode = this.getTargetNode()

    const rect = getComputedClientRect(targetNode, contentWindow)
    const { top, left } = rect

    return {
      left,
      top,
    }
  }

  forceHideMenuNode = () => {
    if (!this.placementNode) return
    this.placementNode.style.display = 'none'
  }

  updateMenuNodePosition = () => {
    this.memoSetPositionStylesOnNode(this.getPositionProps())
  }

  repositionMenuNodeCycle = () => {
    this.updateMenuNodePosition()
    if (!this.didOpen) {
      this.didOpen = true
    }
    if (isBrowserEnv()) {
      this.positionRAF = requestAnimationFrame(this.repositionMenuNodeCycle)
    }
  }

  onPortalOpen = () => {
    this.props.onMenuMounted()
    // Start the reposition cycle
    this.positionRAF = requestAnimationFrame(this.repositionMenuNodeCycle)
  }

  onPortalClose = () => {
    this.props.onMenuUnmounted()
    this.didOpen = false
    // End the reposition cycle
    cancelAnimationFrame(this.positionRAF)

    // This call busts the out-of-date memorized props for
    // `memoSetPositionStylesOnNode` with the default settings provided by
    // `getPositionProps` when the `node` or `placementNode` are not defined.
    this.updateMenuNodePosition()

    this.props.closeDropdown()
    this.focusTriggerNodeOnClose()
  }

  focusTriggerNodeOnClose = () => {
    const { shouldRefocusOnClose, triggerNode } = this.props

    if (!shouldRefocusOnClose(this.props) || !triggerNode) return

    triggerNode.focus()
  }

  getPositionProps = () => {
    const { positionFixed } = this.props

    const defaultStyles = {
      position: positionFixed,
      top: 0,
      left: 0,
    }

    if (!this.node || !this.placementNode) return defaultStyles

    const { top, left } = this.getStylePosition()
    const position = positionFixed ? 'fixed' : 'absolute'

    return {
      left,
      position,
      top,
    }
  }

  setPositionStylesOnNode = positionData => {
    const { menuOffsetTop, onMenuReposition, triggerNode, zIndex } = this.props

    if (!this.node || !this.placementNode) return

    const { top, left, position } = positionData

    const positionProps = {
      top: Math.round(top),
      left: Math.round(left),
      position,
      triggerNode,
      placementNode: this.placementNode,
      menuNode: this.node,
      zIndex,
      didOpen: this.didOpen,
    }

    this.placementNode.style.position = position
    this.placementNode.style.top = `${Math.round(top)}px`
    this.placementNode.style.left = `${Math.round(left)}px`
    this.placementNode.style.zIndex = `${zIndex}`

    // Provide properties via stateReducer callback
    onMenuReposition(positionProps)

    // Skipping coverage for this method as it does almost exclusively DOM
    // calculations, which isn't a JSDOM's forte.
    if (triggerNode) {
      this.placementNode.style.width = `${triggerNode.clientWidth}px`
    }

    if (this.props.forceDropDown) return
    if (!this.shouldDropDirectionUpdate(positionProps)) return

    if (this.shouldDropUp()) {
      this.node.classList.add('is-dropUp')
      if (triggerNode) {
        this.placementNode.style.marginTop = `-${
          triggerNode.clientHeight + menuOffsetTop
        }px`
      }
    } else {
      this.node.classList.remove('is-dropUp')
      if (triggerNode) {
        this.placementNode.style.marginTop = `${menuOffsetTop}px`
      }
    }
  }

  setNodeRef = node => {
    if (node) {
      this.node = node
      this.parentNode = node.parentElement
    }

    this.props.menuRef(node)
  }

  setWrapperNode = node => {
    this.wrapperNode = node
  }
  setPlacementNode = node => {
    this.placementNode = node
  }

  render() {
    const {
      animationDuration,
      animationSequence,
      className,
      dropRight,
      focusItem,
      isOpen,
      selectItem,
    } = this.props

    const shouldDropUp = this.shouldDropUp()

    const componentClassName = classNames(
      'c-DropdownMenuContainer',
      !dropRight && 'is-dropLeft',
      className
    )

    return (
      <div className="DropdownMenuContainerRoot" ref={this.setWrapperNode}>
        <MenuPortal
          id={this.id}
          isOpen={isOpen}
          onOpen={this.onPortalOpen}
          onClose={this.onPortalClose}
        >
          <div
            className="DropdownMenuContainerPlacementRoot"
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
                ref={this.setNodeRef}
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
        </MenuPortal>
      </div>
    )
  }
}

MenuContainer.propTypes = {
  allowMultipleSelection: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationSequence: PropTypes.string,
  className: PropTypes.string,
  clearSelection: PropTypes.func,
  closeDropdown: PropTypes.func,
  contentWindow: PropTypes.object,
  dropRight: PropTypes.bool,
  dropUp: PropTypes.bool,
  forceDropDown: PropTypes.bool,
  focusItem: PropTypes.func,
  getState: PropTypes.func,
  id: PropTypes.string,
  innerRef: PropTypes.func,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.any),
  menuOffsetTop: PropTypes.number,
  onMenuMounted: PropTypes.func,
  onMenuReposition: PropTypes.func,
  onMenuUnmounted: PropTypes.func,
  positionFixed: PropTypes.bool,
  renderEmpty: PropTypes.any,
  renderLoading: PropTypes.any,
  selectItem: PropTypes.func,
  selectionClearer: PropTypes.string,
  shouldDropDirectionUpdate: PropTypes.func,
  shouldRefocusOnClose: PropTypes.func,
  triggerId: PropTypes.string,
  triggerNode: PropTypes.any,
  zIndex: PropTypes.number,
}

MenuContainer.defaultProps = {
  animationDuration: 80,
  animationSequence: 'fade down',
  closeDropdown: noop,
  contentWindow: window,
  dropRight: true,
  dropUp: false,
  forceDropDown: false,
  focusItem: noop,
  getState: noop,
  menuRef: noop,
  isLoading: false,
  isOpen: true,
  items: [],
  menuOffsetTop: 0,
  onMenuMounted: noop,
  onMenuReposition: noop,
  onMenuUnmounted: noop,
  positionFixed: false,
  shouldDropDirectionUpdate: () => true,
  shouldRefocusOnClose: () => true,
  selectItem: noop,
  clearSelection: noop,
  zIndex: 1080,
}

const ConnectedMenuContainer = connect(
  // mapStateToProps
  state => {
    const {
      allowMultipleSelection,
      contentWindow,
      dropUp,
      forceDropDown,
      getState,
      isLoading,
      isOpen,
      items,
      menuId,
      menuOffsetTop,
      positionFixed,
      renderEmpty,
      renderLoading,
      selectedItem,
      selectionClearer,
      shouldDropDirectionUpdate,
      shouldRefocusOnClose,
      triggerId,
      triggerNode,
      zIndex,
    } = state

    return {
      allowMultipleSelection,
      contentWindow,
      dropRight: isDropRight(state),
      dropUp,
      forceDropDown,
      getState,
      id: menuId,
      isLoading,
      isOpen,
      items,
      menuOffsetTop,
      positionFixed,
      renderEmpty,
      renderLoading,
      selectedItem,
      selectionClearer,
      shouldDropDirectionUpdate,
      shouldRefocusOnClose,
      triggerId,
      triggerNode,
      zIndex,
    }
  },
  // mapDispatchToProps
  {
    clearSelection,
    closeDropdown,
    focusItem,
    onMenuMounted,
    onMenuReposition,
    onMenuUnmounted,
    selectItem,
  }
)(MenuContainer)

function isBrowserEnv() {
  if (isNil(process)) return true

  return get(process, 'browser') === true
}

export default ConnectedMenuContainer
