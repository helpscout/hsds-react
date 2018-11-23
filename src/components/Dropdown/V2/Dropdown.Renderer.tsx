import * as React from 'react'
import { connect } from 'unistore/react'
import Keys from '../../../constants/Keys'
import KeypressListener from '../../KeypressListener'
import {
  focusItem,
  incrementIndex,
  decrementIndex,
  selectItemFromIndex,
} from './Dropdown.actions'
import { getNextChildPath, getParentPath, isDropRight } from './Dropdown.utils'
import {
  didCloseSubMenu,
  findItemDOMNode,
  findItemDOMNodeById,
  findOpenItemDOMNodes,
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
    if (!this.props.enableTabNavigation) return
    requestAnimationFrame(() => {
      const target = document.activeElement
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
        this.props.selectItemFromIndex()
        break

      default:
        break
    }
  }

  openSubMenu = () => {
    const { index, isOpen } = this.props
    if (!isOpen || !isDefined(index)) return

    const nextIndex = getNextChildPath(index)

    this.setNextActiveItem(nextIndex)
  }

  closeSubMenu = () => {
    const { index, isOpen } = this.props
    if (!isOpen || !isDefined(index)) return

    const nextIndex = getParentPath(index)

    this.setNextActiveItem(nextIndex)
  }

  setNextActiveItem = (nextActiveIndex: string) => {
    const { envNode } = this.props
    /* istanbul ignore if */
    if (!isDefined(nextActiveIndex)) return

    const target = findItemDOMNode(nextActiveIndex, envNode)

    if (target) {
      this.props.focusItem({ target })
      scrollIntoView(target)
    }
  }

  optimizedItemRenderFromProps = () => {
    const {
      activeClassName,
      envNode,
      focusClassName,
      previousIndex,
      index,
      openClassName,
      previousSelectedItem,
      selectedItem,
    } = this.props

    if (!index && !selectedItem) return
    // This can be abstracted to CSS classes to keep JS tidier.
    // Render focus (hover) styles
    const previousNode = findItemDOMNode(previousIndex, envNode)
    const nextNode = findItemDOMNode(index, envNode)
    const openNodes = findOpenItemDOMNodes(envNode, openClassName)

    const closedSubMenu = didCloseSubMenu(previousIndex, index)

    // Render (recursive) sub-menu interactions
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

    // Render previous interactions
    if (previousNode) {
      const isOpen = isOpenFromIndex(index, previousIndex)

      if (isOpen) {
        previousNode.classList.add(openClassName)
      } else {
        previousNode.classList.remove(focusClassName)
        previousNode.classList.remove(openClassName)
        resetSubMenuScrollPositionFromItemNode(previousNode)
      }
    }

    // Render next interactions
    if (nextNode) {
      nextNode.classList.add(focusClassName)
      scrollIntoView(nextNode)
      if (closedSubMenu) {
        nextNode.classList.remove(openClassName)
      }
    }

    requestAnimationFrame(() => {
      // Render selected (active) styles
      const previousSelectedNode = findItemDOMNodeById(
        previousSelectedItem,
        envNode
      )
      if (previousSelectedNode) {
        previousSelectedNode.classList.remove(activeClassName)
      }

      const selectedNode = findItemDOMNodeById(selectedItem, envNode)

      if (selectedNode) {
        selectedNode.classList.add(activeClassName)
        setAriaActiveOnMenuFromItemNode(selectedNode)
      }
    })
  }

  render() {
    // We'll update the DOM for every render cycle
    // It may feel "wrong"... But, this is FAR cheaper than
    // relying on React to do it.

    // That is because we're doing with a single (more or less) calculcation
    // rather than spreading the work throughout the menu/item tree.
    // This is especially important if item nesting is going to be a thing.
    this.optimizedItemRenderFromProps()

    return (
      <div className="c-DropdownV2RendererNode">
        <KeypressListener handler={this.handleOnKeyDown} type="keydown" />
      </div>
    )
  }
}

const ConnectedRenderer: any = connect(
  // mapStateToProps
  (state: any) => {
    const {
      activeClassName,
      enableTabNavigation,
      envNode,
      focusClassName,
      previousIndex,
      index,
      indexMap,
      isOpen,
      openClassName,
      previousSelectedItem,
      selectedItem,
    } = state

    return {
      activeClassName,
      enableTabNavigation,
      envNode,
      dropRight: isDropRight(state),
      focusClassName,
      previousIndex,
      index,
      indexMap,
      isOpen,
      openClassName,
      previousSelectedItem,
      selectedItem,
    }
  },
  // mapDispatchToProps
  {
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
