import * as React from 'react'
import { connect } from 'unistore/react'
import renderSpy from '@helpscout/react-utils/dist/renderSpy'
import Keys from '../../../constants/Keys'
import KeypressListener from '../../KeypressListener'
import {
  focusItem,
  incrementIndex,
  decrementIndex,
  selectItemFromIndex,
} from './Dropdown.actions'
import {
  SELECTORS,
  findItemDOMNode,
  findItemDOMNodeById,
  isDOMNodeValidItem,
} from './Dropdown.utils'
import { scrollIntoView } from '../../../utilities/scrolling'
import { noop } from '../../../utilities/other'

class Renderer extends React.PureComponent<any> {
  static defaultProps = {
    decrementIndex: noop,
    enableTabNavigation: true,
    focusItem: noop,
    incrementIndex: noop,
    items: [],
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

      case Keys.TAB:
        this.handleTab(event)
        break

      case Keys.ENTER:
        event.preventDefault()
        this.props.selectItemFromIndex()
        break

      default:
        break

      // case Keys.LEFT_ARROW:
      //   event.preventDefault()
      //   if (dropRight) {
      //     this.closeSubMenu()
      //   } else {
      //     this.openSubMenu()
      //   }
      //   break

      // case Keys.RIGHT_ARROW:
      //   event.preventDefault()
      //   if (dropRight) {
      //     this.openSubMenu()
      //   } else {
      //     this.closeSubMenu()
      //   }
      //   break
    }
  }

  optimizedItemRenderFromProps = () => {
    const {
      activeClassName,
      focusClassName,
      previousIndex,
      index,
      previousSelectedItem,
      selectedItem,
    } = this.props

    if (!index && !selectedItem) return
    // This can be abstracted to CSS classes to keep JS tidier.
    // Render focus (hover) styles
    const previousNode = findItemDOMNode(previousIndex)
    const nextNode = findItemDOMNode(index)

    console.log(nextNode)

    if (!nextNode) return

    // Handle the UI for focus, however it is you wish!
    if (previousNode) {
      previousNode.classList.remove(focusClassName)
    }

    nextNode.classList.add(focusClassName)
    scrollIntoView(nextNode)

    requestAnimationFrame(() => {
      // Render selected (active) styles
      // Handle the UI for select/active, however it is you wish!
      const previousSelectedNode = findItemDOMNodeById(previousSelectedItem)
      if (previousSelectedNode) {
        previousSelectedNode.classList.remove(activeClassName)
      }

      const selectedNode = findItemDOMNodeById(selectedItem)
      if (selectedNode) {
        selectedNode.classList.add(activeClassName)
        // @ts-ignore
        const menuNode = selectedNode.closest(`[${SELECTORS.menuAttribute}]`)
        if (menuNode) {
          menuNode.setAttribute('aria-activedescendant', selectedNode.id)
        }
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
      focusClassName,
      previousIndex,
      index,
      indexMap,
      isMounted,
      previousSelectedItem,
      selectedItem,
    } = state

    return {
      activeClassName,
      enableTabNavigation,
      focusClassName,
      previousIndex,
      index,
      indexMap,
      isMounted,
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

export default renderSpy({ id: 'Dropdown.Renderer' })(ConnectedRenderer)
