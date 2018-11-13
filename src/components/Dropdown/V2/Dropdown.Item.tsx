import * as React from 'react'
import { connect } from 'unistore/react'
import Flexy from '../../Flexy'
import Icon from '../../Icon'
import Menu from './Dropdown.Menu'
import {
  ItemUI,
  ActionUI,
  WrapperUI,
  SubMenuIncidatorUI,
} from './Dropdown.css.js'
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
  id?: string
  index: string
  innerRef: (node: HTMLElement) => void
  items: Array<any>
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
    if (this.hasSubMenu()) return
    this.props.onSelect(event)
  }

  setEventTargetAsActive = (event: Event) => {
    const node = event.currentTarget as HTMLElement
    this.props.setActiveItem(node)
  }

  getActionId = (): string => {
    const { id } = this.props

    return pathResolve(id, 'action')
  }

  getSubMenuId = (): string => {
    const { id } = this.props

    return pathResolve(id, 'sub-menu')
  }

  hasSubMenu = (): boolean => {
    const { items } = this.props

    return !!(items && items.length)
  }

  isHover = (): boolean => {
    const { activeIndex, index } = this.props
    return isPathActive(activeIndex, index)
  }

  isOpen = (): boolean => {
    const { activeIndex, index } = this.props
    return this.isHover() && index.length < activeIndex.length
  }

  isSelected = () => {
    const { activeIndex, index } = this.props
    return activeIndex === index
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
    const { className, id, index, value } = this.props

    return {
      className: classNames(
        'c-DropdownV2Item',
        className,
        this.isHover() && 'is-hover',
        this.isOpen() && 'is-open'
      ),
      'aria-selected': this.isSelected(),
      'aria-haspopup': this.hasSubMenu(),
      'aria-expanded': this.isHover(),
      id,
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
      this.hasSubMenu() && (
        <WrapperUI {...this.getWrapperProps()}>
          <Menu
            aria-labelledby={this.getActionId()}
            innerRef={this.setMenuNodeRef}
            isSubMenu
            id={this.getSubMenuId()}
          >
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

  renderSubMenuIndicator = () => {
    const { dropRight } = this.props
    const icon = dropRight ? 'caret-right' : 'caret-left'

    return (
      this.hasSubMenu() && (
        <Flexy.Item>
          <SubMenuIncidatorUI>
            <Icon name={icon} size="12" shade="extraMuted" />
          </SubMenuIncidatorUI>
        </Flexy.Item>
      )
    )
  }

  render() {
    return (
      <ItemUI {...this.getItemProps()}>
        <ActionUI
          id={this.getActionId()}
          innerRef={this.setActionNodeRef}
          className={classNames(
            this.hasSubMenu() && 'has-subMenu',
            'c-DropdownV2ItemAction'
          )}
        >
          <Flexy gap="sm">
            <Flexy.Block>{this.props.children}</Flexy.Block>
            {this.renderSubMenuIndicator()}
          </Flexy>
        </ActionUI>
        {this.renderSubMenu()}
      </ItemUI>
    )
  }
}

const ConnectedItem: any = connect(
  // mapStateToProps
  (state: any, ownProps: any) => {
    const { activeIndex, dropUp, direction, id } = state
    return {
      activeIndex,
      dropUp,
      dropRight: direction === 'right',
      id: pathResolve(id, ownProps.index),
    }
  },
  // mapDispatchToProps
  { setActiveItem, onSelect }
)(
  // @ts-ignore
  Item
)

export default ConnectedItem
