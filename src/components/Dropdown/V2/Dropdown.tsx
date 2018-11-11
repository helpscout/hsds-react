import * as React from 'react'
import {
  DropdownUI,
  MenuUI,
  ItemUI,
  ActionUI,
  WrapperUI,
} from './Dropdown.css.js'

const selectors = {
  itemAttribute: 'data-hsds-menu-item',
}

export class Item extends React.PureComponent<any> {
  handleOnMouseEnter = event => {
    // event.target.focus()
  }
  handleOnMouseLeave = event => {
    // event.target.blur()
  }

  render() {
    return (
      <ItemUI
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        <ActionUI>{this.props.children}</ActionUI>
        {this.props.menu && <WrapperUI>{this.props.menu}</WrapperUI>}
      </ItemUI>
    )
  }
}

export class Dropdown extends React.Component {
  activeItem: HTMLElement | Element

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

  goUp = () => {
    const node = this.activeItem

    if (!node || !node.getAttribute(selectors.itemAttribute)) {
      const targets = document.querySelectorAll(`[${selectors.itemAttribute}]`)
      const target = targets[targets.length - 1]
      this.activeItem = target
    } else {
      if (node && node.previousElementSibling) {
        this.activeItem = node.previousElementSibling
      }
    }
    if (this.activeItem) {
      // @ts-ignore
      this.activeItem.focus()
    }
  }

  goDown = () => {
    const node = this.activeItem

    if (!node || !node.getAttribute(selectors.itemAttribute)) {
      const targets = document.querySelectorAll(`[${selectors.itemAttribute}]`)
      const target = targets[0]
      this.activeItem = target
    } else {
      if (node && node.nextElementSibling) {
        this.activeItem = node.nextElementSibling
      }
    }
    if (this.activeItem) {
      // @ts-ignore
      this.activeItem.focus()
    }
  }

  focusItem = node => {
    node.focus()
  }

  render() {
    return (
      <DropdownUI>
        <MenuUI>
          <Item
            menu={
              <MenuUI>
                <Item>Action</Item>
                <Item>Action</Item>
                <Item>Action</Item>
                <Item>Action</Item>
              </MenuUI>
            }
          >
            Action
          </Item>
        </MenuUI>
      </DropdownUI>
    )
  }
}

export default Dropdown
