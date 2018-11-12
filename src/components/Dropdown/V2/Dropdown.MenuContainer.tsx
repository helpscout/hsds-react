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
import { closeDropdown, setActiveItem } from './Dropdown.actions'
import { MenuContainerUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  activeIndex: string
  className?: string
  closeDropdown: () => void
  direction: string
  dropUp: boolean
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  items: Array<any>
  setActiveItem: (node: HTMLElement) => void
}

export class MenuContainer extends React.Component<Props> {
  static defaultProps = {
    activeIndex: '0',
    closeDropdown: noop,
    direction: 'right',
    dropUp: false,
    innerRef: noop,
    items: [],
    isOpen: true,
    setActiveItem: noop,
  }

  node: HTMLElement

  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) return true
    return false
  }

  handleOnKeyDown = event => {
    const { direction } = this.props
    const amount = 1

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
        if (direction === 'right') {
          this.closeSubMenu()
        } else {
          this.openSubMenu()
        }
        break

      case Keys.RIGHT_ARROW:
        event.preventDefault()
        if (direction === 'right') {
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
      `[${selectors.indexAttribute}="${nextActiveIndex}"]`
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

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }

  render() {
    const { className, isOpen, items } = this.props
    const componentClassName = classNames(
      'c-DropdownV2MenuContainer',
      className
    )

    return (
      <MenuContainerUI
        className={componentClassName}
        innerRef={this.setNodeRef}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <Menu>
          {items.map((item, index) => (
            <Item key={item.id} {...item} index={pathResolve(index)}>
              {item.label}
            </Item>
          ))}
        </Menu>
      </MenuContainerUI>
    )
  }
}

const ConnectedMenuContainer: any = connect(
  // mapStateToProps
  (state: any) => {
    const { activeItem, activeIndex, direction, isOpen, items } = state
    return { activeItem, activeIndex, direction, isOpen, items }
  },
  // mapDispatchToProps
  { closeDropdown, setActiveItem }
)(
  // @ts-ignore
  MenuContainer
)

export default ConnectedMenuContainer
