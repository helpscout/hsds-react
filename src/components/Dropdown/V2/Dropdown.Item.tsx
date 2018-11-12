import * as React from 'react'
import { connect } from 'unistore/react'
import Menu from './Dropdown.Menu'
import { ItemUI, ActionUI, WrapperUI } from './Dropdown.css.js'
import {
  selectors,
  isPathActive,
  pathResolve,
  setMenuPositionStyles,
} from './Dropdown.utils'
import { setActiveItem, onSelect } from './Dropdown.actions'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  activeIndex: string
  className?: string
  dropRight: boolean
  dropUp: boolean
  index: string
  innerRef: (node: HTMLElement) => void
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
    innerRef: noop,
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

    setMenuPositionStyles({
      dropRight,
      dropUp,
      menuNode: this.menuNode,
      wrapperNode: this.wrapperNode,
      itemNode: this.node,
      triggerNode: this.actionNode,
    })
  }

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }
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
  // mapStateToProps
  (state: any) => {
    const { activeIndex, dropUp, direction } = state
    return {
      activeIndex,
      dropUp,
      dropRight: direction === 'right',
    }
  },
  // mapDispatchToProps
  { setActiveItem, onSelect }
)(
  // @ts-ignore
  Item
)

export default ConnectedItem
