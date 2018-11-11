import * as React from 'react'
import {
  DropdownUI,
  MenuUI,
  ItemUI,
  ActionUI,
  WrapperUI,
} from './Dropdown.css.js'
import createStore from 'unistore'
import { Provider, connect } from 'unistore/react'

const selectors = {
  actionAttribute: 'data-hsds-menu-action',
  itemAttribute: 'data-hsds-menu-item',
  menuAttribute: 'data-hsds-menu',
}

const store = createStore({
  activeItem: null,
})

const setActiveItem = (state, activeItem) => {
  return {
    ...state,
    activeItem,
  }
}

export class Item extends React.PureComponent<any> {
  node: HTMLElement
  actionNode: HTMLElement
  wrapperNode: HTMLElement
  menuNode: HTMLElement | null

  componentDidMount() {
    if (this.node) {
      this.menuNode = this.node.querySelector(`[${selectors.menuAttribute}]`)
      this.renderMenu()
    }
  }

  handleOnMouseEnter = event => {
    // event.target.focus()
    this.props.setActiveItem(event.currentTarget)
    event.currentTarget.focus()
    this.renderMenu()
  }
  handleOnMouseLeave = event => {
    // event.target.blur()
  }
  handleOnFocus = event => {
    // this.props.setActiveItem(event.target)
    // this.renderMenu()
  }

  renderMenu = () => {
    if (!this.menuNode) return
    this.menuNode.scrollTop = 0
    const activeItem = this.menuNode.querySelector(
      `[${selectors.itemAttribute}]`
    )

    if (activeItem) {
      this.props.setActiveItem(activeItem)
      // @ts-ignore
      activeItem.focus()
      const menuOffset = 8

      if (this.wrapperNode) {
        const actionNodeMenu = this.actionNode.closest(
          `[${selectors.menuAttribute}]`
        )
        this.wrapperNode.style.transform = `translateY(-${this.actionNode
          .offsetHeight +
          (actionNodeMenu ? actionNodeMenu.scrollTop : 0) +
          menuOffset}px)`
      }
    }
  }

  setNodeRef = node => (this.node = node)
  setActionNodeRef = node => (this.actionNode = node)
  setWrapperNodeRef = node => (this.wrapperNode = node)

  render() {
    return (
      <ItemUI
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        onFocus={this.handleOnFocus}
        innerRef={this.setNodeRef}
      >
        <ActionUI innerRef={this.setActionNodeRef}>
          {this.props.children}
        </ActionUI>
        {this.props.menu && (
          <WrapperUI innerRef={this.setWrapperNodeRef}>
            {this.props.menu}
          </WrapperUI>
        )}
      </ItemUI>
    )
  }
}

// @ts-ignore
const ConnectedItem: any = connect('activeItem', { setActiveItem })(Item)

export class Dropdown extends React.Component<any> {
  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  handleOnKeyDown = event => {
    switch (event.keyCode) {
      case 38:
        event.preventDefault()
        this.goUp()
        break
      case 40:
        event.preventDefault()
        this.goDown()
        break
      // LEFT
      default:
        break
    }
  }

  shouldComponentUpdate() {
    return false
  }

  goUp = () => {
    const node = this.props.activeItem
    let nextActiveItem

    if (!node || !node.getAttribute(selectors.itemAttribute)) {
      const targets = document.querySelectorAll(`[${selectors.itemAttribute}]`)
      const target = targets[targets.length - 1]
      nextActiveItem = target
    } else {
      if (node && node.previousElementSibling) {
        nextActiveItem = node.previousElementSibling
      }
    }
    if (nextActiveItem) {
      // @ts-ignore
      this.props.setActiveItem(nextActiveItem)
    }

    nextActiveItem.focus()
  }

  goDown = () => {
    const node = this.props.activeItem
    let nextActiveItem

    if (!node || !node.getAttribute(selectors.itemAttribute)) {
      const targets = document.querySelectorAll(`[${selectors.itemAttribute}]`)
      const target = targets[0]
      nextActiveItem = target
    } else {
      if (node && node.nextElementSibling) {
        nextActiveItem = node.nextElementSibling
      }
    }
    if (nextActiveItem) {
      this.props.setActiveItem(nextActiveItem)
    }

    nextActiveItem.focus()
  }

  render() {
    console.log('redner')
    return (
      <DropdownUI>
        <MenuUI>
          <ConnectedItem
            menu={
              <MenuUI>
                <ConnectedItem>A</ConnectedItem>
                <ConnectedItem>B</ConnectedItem>
                <ConnectedItem
                  menu={
                    <MenuUI>
                      <ConnectedItem>A</ConnectedItem>
                      <ConnectedItem>B</ConnectedItem>
                      <ConnectedItem>C</ConnectedItem>
                      <ConnectedItem>D</ConnectedItem>
                    </MenuUI>
                  }
                >
                  C
                </ConnectedItem>
                <ConnectedItem>D</ConnectedItem>
                <ConnectedItem>E</ConnectedItem>
                <ConnectedItem>F</ConnectedItem>
                <ConnectedItem>G</ConnectedItem>
              </MenuUI>
            }
          >
            One
          </ConnectedItem>
        </MenuUI>
      </DropdownUI>
    )
  }
}

// @ts-ignore
const ConnectedDropdown: any = connect('activeItem', { setActiveItem })(
  // @ts-ignore
  Dropdown
)

class StatefulDropdown extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedDropdown />
      </Provider>
    )
  }
}

export default StatefulDropdown
