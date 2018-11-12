import * as React from 'react'
import { connect } from 'unistore/react'
import Menu from './Dropdown.Menu'
import { ItemUI, ActionUI, WrapperUI } from './Dropdown.css.js'
import { selectors, isPathActive, pathResolve } from './Dropdown.utils'
import { setActiveItem, onSelect } from './Dropdown.actions'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  activeIndex: string
  dropRight: boolean
  dropUp: boolean
  index: string
  items?: Array<any>
  onSelect: (event: Event) => void
  setActiveItem: (node: HTMLElement) => void
  label: string
  value: string
}

export class Item extends React.PureComponent<Props> {
  static defaultProps = {
    activeIndex: '0',
    index: '0',
    items: undefined,
    dropRight: true,
    dropUp: false,
    onSelect: noop,
    setActiveItem: noop,
    label: '',
    value: '',
  }

  node: HTMLElement
  actionNode: HTMLElement
  wrapperNode: HTMLElement
  menuNode: HTMLElement | null

  componentDidMount() {
    if (this.node) {
      this.renderMenu()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.renderMenu()
    }
  }

  handleOnMouseEnter = (event: MouseEvent) => {
    this.setEventTargetAsActive(event)
  }

  handleOnFocus = (event: Event) => {
    event.stopPropagation()
    this.setEventTargetAsActive(event)
  }

  handleOnClick = (event: Event) => {
    event.stopPropagation()
    this.props.onSelect(event)
  }

  setEventTargetAsActive = (event: Event) => {
    const node = event.currentTarget as HTMLElement
    this.props.setActiveItem(node)
  }

  isHover = () => {
    const { activeIndex, index } = this.props
    return isPathActive(activeIndex, index)
  }

  isOpen = () => {
    const { activeIndex, index } = this.props
    return this.isHover() && index.length < activeIndex.length
  }

  renderMenu = () => {
    const { dropRight, dropUp } = this.props
    let translateY

    if (!this.menuNode) return
    this.menuNode.scrollTop = 0

    if (this.wrapperNode) {
      const menuOffset = 9
      const { top } = this.node.getBoundingClientRect()
      const { height } = this.wrapperNode.getBoundingClientRect()
      const actionNodeMenu = this.actionNode.closest(
        `[${selectors.menuAttribute}]`
      )

      translateY =
        this.actionNode.offsetHeight +
        (actionNodeMenu ? actionNodeMenu.scrollTop : 0) +
        menuOffset

      const predictedOffsetBottom = translateY + height + top

      const shouldDropUp = window.innerHeight < predictedOffsetBottom

      if (!dropRight) {
        this.wrapperNode.style.right = '100%'
        this.wrapperNode.style.paddingLeft = '0px'
        this.wrapperNode.style.paddingRight = '20px'
      } else {
        this.wrapperNode.style.left = '100%'
        this.wrapperNode.style.paddingLeft = '20px'
        this.wrapperNode.style.paddingRight = '0px'
      }

      if (dropUp || shouldDropUp) {
        translateY = this.wrapperNode.clientHeight - menuOffset
      }

      this.wrapperNode.style.transform = `translateY(-${translateY}px)`
    }
  }

  setNodeRef = node => (this.node = node)
  setActionNodeRef = node => (this.actionNode = node)
  setWrapperNodeRef = node => (this.wrapperNode = node)
  setMenuNodeRef = node => (this.menuNode = node)

  getItemProps = () => {
    const { index, value } = this.props

    return {
      className: classNames(
        this.isHover() && 'is-hover',
        this.isOpen() && 'is-open',
        'c-DropdownV2Item'
      ),
      onClick: this.handleOnClick,
      onMouseEnter: this.handleOnMouseEnter,
      onFocus: this.handleOnFocus,
      innerRef: this.setNodeRef,
      [selectors.indexAttribute]: index,
      [selectors.valueAttribute]: value,
    }
  }

  getWrapperProps = () => {
    const { index, value } = this.props

    return {
      className: 'c-DropdownV2MenuWrapper',
      innerRef: this.setWrapperNodeRef,
      [selectors.indexAttribute]: index,
      [selectors.valueAttribute]: value,
    }
  }

  renderSubMenu = () => {
    const { index: path, items } = this.props

    return (
      !!(items && items.length) && (
        <WrapperUI {...this.getWrapperProps()}>
          <Menu innerRef={this.setMenuNodeRef} isSubMenu>
            {items.map((item, index) => (
              <ConnectedItem
                key={item.id}
                {...item}
                index={pathResolve(path, index)}
              >
                {item.label}
              </ConnectedItem>
            ))}
          </Menu>
        </WrapperUI>
      )
    )
  }

  render() {
    return (
      <ItemUI {...this.getItemProps()}>
        <ActionUI
          innerRef={this.setActionNodeRef}
          className="c-DropdownV2ItemAction"
        >
          {this.props.children}
        </ActionUI>
        {this.renderSubMenu()}
      </ItemUI>
    )
  }
}

const ConnectedItem: any = connect(
  (state: any) => {
    const { activeIndex, dropUp, direction } = state
    return {
      activeIndex,
      dropUp,
      dropRight: direction === 'right',
    }
  },
  { setActiveItem, onSelect }
)(
  // @ts-ignore
  Item
)

export default ConnectedItem
