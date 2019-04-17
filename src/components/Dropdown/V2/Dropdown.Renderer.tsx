import * as React from 'react'
import { connect } from '@helpscout/wedux'
import Keys from '../../../constants/Keys'
import KeypressListener from '../../KeypressListener'
import {
  focusItem,
  incrementIndex,
  decrementIndex,
  selectItemFromIndex,
  closeDropdown,
} from './Dropdown.actions'
import {
  itemIsActive,
  getNextChildPath,
  getParentPath,
  isDropRight,
} from './Dropdown.utils'
import {
  didCloseSubMenu,
  findItemDOMNode,
  findItemDOMNodeById,
  findOpenItemDOMNodes,
  findFocusedItemDOMNodes,
  getIndexFromItemDOMNode,
  isDOMNodeValidItem,
  isOpenFromIndex,
  resetSubMenuScrollPositionFromItemNode,
  setAriaActiveOnMenuFromItemNode,
} from './Dropdown.renderUtils'
import { isDefined } from '../../../utilities/is'
import { scrollIntoView } from '../../../utilities/scrolling'
import { noop } from '../../../utilities/other'

class Renderer extends React.PureComponent<any> {
  static defaultProps = {
    activeClassName: 'is-active',
    decrementIndex: noop,
    enableTabNavigation: true,
    focusClassName: 'is-focused',
    focusItem: noop,
    incrementIndex: noop,
    items: [],
    openClassName: 'is-open',
    selectItemFromIndex: noop,
  }

  handleTab = (event: Event) => {
    const { closeDropdown, enableTabNavigation, items, index } = this.props

    if (!enableTabNavigation) return
    requestAnimationFrame(() => {
      const target = document.activeElement
      const isLastItem = parseInt(index, 10) === items.length - 1

      if (isLastItem) {
        closeDropdown()
        return
      }

      if (!isDOMNodeValidItem(target)) return
      event.preventDefault()

      this.props.focusItem({ target })
    })
  }

  handleOnKeyDown = event => {
    const { dropRight } = this.props
    const modifier = 1

    switch (event.keyCode) {
      case Keys.UP_ARROW:
        event.preventDefault()
        this.props.decrementIndex(modifier)
        break

      case Keys.DOWN_ARROW:
        event.preventDefault()
        this.props.incrementIndex(modifier)
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
        this.handleTab(event)
        break

      case Keys.ENTER:
        event.preventDefault()
        this.props.selectItemFromIndex(event)
        break

      default:
        break
    }
  }

  openSubMenu() {
    const { index, isOpen } = this.props
    if (!isOpen || !isDefined(index)) return

    const nextIndex = getNextChildPath(index)

    this.setNextIndex(nextIndex)
  }

  closeSubMenu() {
    const { index, isOpen } = this.props
    if (!isOpen || !isDefined(index)) return

    const nextIndex = getParentPath(index)

    this.setNextIndex(nextIndex)
  }

  setNextIndex = (nextIndex: string) => {
    const { envNode } = this.props
    /* istanbul ignore if */
    if (!isDefined(nextIndex)) return

    const target = findItemDOMNode(nextIndex, envNode)

    if (target) {
      this.props.focusItem({ target })
      this.scrollIntoView(target)
    }
  }

  scrollIntoView = node => {
    if (node) {
      scrollIntoView(node)
    }
  }

  shouldRenderDOM() {
    const { index, selectedItem } = this.props

    return index || selectedItem
  }

  renderSubMenus() {
    const { envNode, focusClassName, index, openClassName } = this.props

    if (!this.shouldRenderDOM()) return

    const openNodes = findOpenItemDOMNodes(envNode, openClassName)

    Array.from(openNodes).forEach(node => {
      const nodeIndex = getIndexFromItemDOMNode(node)
      const isOpen = isOpenFromIndex(index, nodeIndex)
      if (isOpen) {
        node.classList.add(openClassName)
      } else {
        node.classList.remove(openClassName)
        node.classList.remove(focusClassName)
      }
    })
  }

  renderPreviousInteraction() {
    const {
      envNode,
      focusClassName,
      previousIndex,
      index,
      openClassName,
    } = this.props

    if (!this.shouldRenderDOM()) return

    const previousNode = findItemDOMNode(previousIndex, envNode)

    if (!previousNode) return

    const isOpen = isOpenFromIndex(index, previousIndex)

    if (isOpen) {
      previousNode.classList.add(openClassName)
    } else {
      Array.from(findFocusedItemDOMNodes(envNode, focusClassName)).forEach(
        node => {
          if (!node.classList.contains(openClassName)) {
            node.classList.remove(focusClassName)
          }
        }
      )
      resetSubMenuScrollPositionFromItemNode(previousNode)
    }
  }

  renderNextInteraction() {
    const {
      envNode,
      focusClassName,
      lastInteractionWasKeyboard,
      index,
      openClassName,
      previousIndex,
    } = this.props

    if (!this.shouldRenderDOM()) return

    const nextNode = findItemDOMNode(index, envNode)

    if (!nextNode) return

    nextNode.classList.add(focusClassName)

    if (lastInteractionWasKeyboard) {
      this.scrollIntoView(nextNode)
    }

    const closedSubMenu = didCloseSubMenu(previousIndex, index)

    if (closedSubMenu) {
      nextNode.classList.remove(openClassName)
    }
  }

  renderSelectedItem() {
    const {
      activeClassName,
      envNode,
      previousSelectedItem,
      selectedItem,
      index,
      indexMap,
      allowMultipleSelection,
    } = this.props

    if (!this.shouldRenderDOM()) return

    if (allowMultipleSelection) {
      const selectedNode = findItemDOMNode(index, envNode)
      const itemId = indexMap[index - 1]
      const nodeIsSelected = itemIsActive(selectedItem, { id: itemId })

      if (selectedNode) {
        if (nodeIsSelected) {
          selectedNode.classList.add(activeClassName)
          setAriaActiveOnMenuFromItemNode(selectedNode)
        } else {
          selectedNode.classList.remove(activeClassName)
        }
      }
    } else {
      // Render selected (active) styles
      const previousSelectedNode = findItemDOMNodeById(
        previousSelectedItem,
        envNode
      )
      const selectedNode = findItemDOMNodeById(selectedItem, envNode)

      if (previousSelectedNode) {
        previousSelectedNode.classList.remove(activeClassName)
      }

      if (selectedNode) {
        selectedNode.classList.add(activeClassName)
        setAriaActiveOnMenuFromItemNode(selectedNode)
      }
    }
  }

  optimizedItemRenderFromProps() {
    if (!this.shouldRenderDOM()) return

    // Render (recursive) sub-menu interactions
    this.renderSubMenus()

    // Render previous interactions
    this.renderPreviousInteraction()

    // Render next interactions
    this.renderNextInteraction()

    // Render selected item
    this.renderSelectedItem()
  }

  optimizedRender() {
    requestAnimationFrame(() => {
      this.optimizedItemRenderFromProps()
    })
  }

  render() {
    // We'll update the DOM for every render cycle
    // It may feel "wrong"... But, this is FAR cheaper than
    // relying on React to do it.

    // That is because we're doing with a single (more or less) calculation
    // rather than spreading the work throughout the menu/item tree.
    // This is especially important if item nesting is going to be a thing.
    this.optimizedRender()

    return (
      <div className="c-DropdownV2RendererNode">
        <KeypressListener
          handler={this.handleOnKeyDown}
          type="keydown"
          scope={this.props.envNode}
        />
      </div>
    )
  }
}

const ConnectedRenderer: any = connect(
  // mapStateToProps
  (state: any) => {
    const {
      activeClassName,
      allowMultipleSelection,
      enableTabNavigation,
      envNode,
      focusClassName,
      index,
      indexMap,
      inputValue,
      isOpen,
      items,
      lastInteractionType,
      openClassName,
      previousIndex,
      previousSelectedItem,
      selectedItem,
    } = state

    return {
      activeClassName,
      allowMultipleSelection,
      enableTabNavigation,
      envNode,
      dropRight: isDropRight(state),
      focusClassName,
      index,
      indexMap,
      inputValue,
      isOpen,
      items,
      lastInteractionWasKeyboard: lastInteractionType === 'keyboard',
      openClassName,
      previousIndex,
      previousSelectedItem,
      selectedItem,
    }
  },
  // mapDispatchToProps
  {
    closeDropdown,
    focusItem,
    incrementIndex,
    decrementIndex,
    selectItemFromIndex,
  }
)(
  // @ts-ignore
  Renderer
)

export default ConnectedRenderer
