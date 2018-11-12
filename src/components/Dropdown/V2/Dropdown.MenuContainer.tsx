import * as React from 'react'
import { connect } from 'unistore/react'
import Menu from './Dropdown.Menu'
import Item from './Dropdown.Item'
import {
  selectors,
  decrementPathIndex,
  incrementPathIndex,
  getParentPath,
  getNextChildPath,
  pathResolve,
} from './Dropdown.utils'
import { setActiveItem } from './Dropdown.actions'
import { noop } from '../../../utilities/other'

export interface Props {
  activeIndex: string
  direction: string
  dropUp: boolean
  items: Array<any>
  setActiveItem: (node: HTMLElement) => void
}

export class MenuContainer extends React.Component<Props> {
  static defaultProps = {
    activeIndex: '0',
    direction: 'right',
    dropUp: false,
    items: [],
    setActiveItem: noop,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  handleOnKeyDown = event => {
    const { direction } = this.props
    const amount = 1

    switch (event.keyCode) {
      case 38:
        event.preventDefault()
        this.goUp(amount)
        break
      case 40:
        event.preventDefault()
        this.goDown(amount)
        break
      // LEFT
      case 37:
        event.preventDefault()
        if (direction === 'right') {
          this.closeSubMenu()
        } else {
          this.openSubMenu()
        }
        break
      // RIGHT
      case 39:
        event.preventDefault()
        if (direction === 'right') {
          this.openSubMenu()
        } else {
          this.closeSubMenu()
        }
        break
      default:
        break
    }
  }

  shouldComponentUpdate() {
    return false
  }

  setNextActiveItem = (nextActiveIndex: string) => {
    if (!nextActiveIndex) return

    const nextActiveItem = document.querySelector(
      `[${selectors.indexAttribute}="${nextActiveIndex}"]`
    ) as HTMLElement

    if (nextActiveItem) {
      this.props.setActiveItem(nextActiveItem)
      nextActiveItem.focus()
    }
  }

  goUp = (amount: number = 1) => {
    const { activeIndex } = this.props
    const nextActiveIndex = decrementPathIndex(activeIndex, amount)

    this.setNextActiveItem(nextActiveIndex)
  }

  goDown = (amount: number = 1) => {
    const { activeIndex } = this.props
    const nextActiveIndex = incrementPathIndex(activeIndex, amount)

    this.setNextActiveItem(nextActiveIndex)
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

  render() {
    const { items } = this.props
    return (
      <Menu>
        {items.map((item, index) => (
          <Item key={item.id} {...item} index={pathResolve(index)}>
            {item.label}
          </Item>
        ))}
      </Menu>
    )
  }
}

const ConnectedMenuContainer: any = connect(
  (state: any) => {
    const { activeItem, activeIndex, direction, items } = state
    return { activeItem, activeIndex, direction, items }
  },
  { setActiveItem }
)(
  // @ts-ignore
  MenuContainer
)

export default ConnectedMenuContainer
