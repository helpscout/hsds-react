import * as React from 'react'
import { connect } from 'unistore/react'
import Animate from '../../Animate'
import Menu from './Dropdown.Menu'
import Item from './Dropdown.Item'
import {
  selectors,
  decrementPathIndex,
  incrementPathIndex,
  isDropRight,
  getParentPath,
  getNextChildPath,
} from './Dropdown.utils'
import { closeDropdown, setActiveItem } from './Dropdown.actions'
import { MenuContainerUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { getComponentKey } from '../../../utilities/component'
import { noop } from '../../../utilities/other'

export interface Props {
  animationDuration: number
  animationSequence: string
  activeIndex: string
  activeId?: string
  className?: string
  closeDropdown: () => void
  dropUp: boolean
  dropRight: boolean
  id: string
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  items: Array<any>
  setActiveItem: (node: HTMLElement) => void
  triggerId?: string
}

export class MenuContainer extends React.Component<Props> {
  static defaultProps = {
    animationDuration: 80,
    animationSequence: 'fade down',
    activeIndex: '0',
    closeDropdown: noop,
    dropUp: false,
    dropRight: true,
    innerRef: noop,
    items: [],
    isOpen: true,
    setActiveItem: noop,
  }

  node: HTMLElement
  parentNode: HTMLElement

  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  handleOnKeyDown = (event: KeyboardEvent) => {
    const { dropRight, isOpen } = this.props
    const amount = 1

    if (!isOpen) return

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

  shouldDropUp = (): boolean => {
    if (this.props.dropUp) return true
    if (!this.node || !this.parentNode) return false

    const { top } = this.parentNode.getBoundingClientRect()
    const { clientHeight: height } = this.node

    return top + height > window.innerHeight
  }

  setNodeRef = node => {
    if (!this.node) {
      this.node = node
      this.parentNode = node.parentElement
    }

    this.props.innerRef(node)
  }

  render() {
    const {
      animationDuration,
      animationSequence,
      activeId,
      className,
      dropRight,
      isOpen,
      items,
      id,
      triggerId,
    } = this.props

    const shouldDropUp = this.shouldDropUp()

    const componentClassName = classNames(
      'c-DropdownV2MenuContainer',
      shouldDropUp && 'is-dropUp',
      !dropRight && 'is-dropLeft',
      className
    )

    return (
      <MenuContainerUI
        className={componentClassName}
        innerRef={this.setNodeRef}
      >
        <Animate
          sequence={shouldDropUp ? 'fade up' : animationSequence}
          in={isOpen}
          mountOnEnter={false}
          unmountOnExit={false}
          duration={animationDuration}
          timeout={animationDuration / 2}
        >
          <Menu
            aria-activedescendant={activeId}
            aria-labelledby={triggerId}
            id={id}
          >
            {items.map((item, index) => (
              <Item key={getComponentKey(item, index)} {...item}>
                {item.label}
              </Item>
            ))}
          </Menu>
        </Animate>
      </MenuContainerUI>
    )
  }
}

const ConnectedMenuContainer: any = connect(
  // mapStateToProps
  (state: any) => {
    const { activeIndex, activeId, dropUp, isOpen, menuId, triggerId } = state

    return {
      activeIndex,
      activeId,
      dropUp,
      dropRight: isDropRight(state),
      isOpen,
      id: menuId,
      triggerId,
    }
  },
  // mapDispatchToProps
  {
    closeDropdown,
    setActiveItem,
  }
)(
  // @ts-ignore
  MenuContainer
)

export default ConnectedMenuContainer
