import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
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
  setMenuPositionStyles,
  getCustomItemProps,
} from './Dropdown.utils'
import { classNames } from '../../../utilities/classNames'
import { getComponentKey } from '../../../utilities/component'
import { noop } from '../../../utilities/other'

export interface Props {
  activeIndex: string
  actionId?: string
  className?: string
  dropRight: boolean
  dropUp: boolean
  id?: string
  index: string
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  isHover: boolean
  items: Array<any>
  onMouseEnter: (event: Event) => void
  onClick: (event: Event, props: any) => void
  onFocus: (event: Event) => void
  onSelect: (event: Event) => void
  renderItem?: (props: any) => void
  setActiveItem: (node: HTMLElement) => void
  subMenuId?: string
  label: string
  value: string
}

export class Item extends React.PureComponent<Props> {
  static defaultProps = {
    activeIndex: '0',
    index: '0',
    innerRef: noop,
    isOpen: false,
    isHover: false,
    items: undefined,
    dropRight: true,
    dropUp: false,
    onMouseEnter: noop,
    onClick: noop,
    onFocus: noop,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.isHover !== this.props.isHover) {
      this.renderMenu()
    }
  }

  handleOnClick = (event: Event) => {
    const { onClick } = this.props

    onClick(event, { hasSubMenu: this.hasSubMenu() })
  }

  hasSubMenu = (): boolean => {
    const { items } = this.props

    return !!(items && items.length)
  }

  renderMenu = () => {
    const { dropRight, dropUp } = this.props

    // Async call to coordinate with Portal adjustments
    requestAnimationFrame(() => {
      if (this.menuNode && this.wrapperNode && this.node && this.actionNode) {
        setMenuPositionStyles({
          dropRight,
          dropUp,
          menuNode: this.menuNode,
          wrapperNode: this.wrapperNode,
          itemNode: this.node,
          triggerNode: this.actionNode,
        })
      }
    })
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
    const { actionId, items, subMenuId } = this.props

    return (
      this.hasSubMenu() && (
        <WrapperUI {...this.getWrapperProps()}>
          <Menu
            aria-labelledby={actionId}
            innerRef={this.setMenuNodeRef}
            isSubMenu
            id={subMenuId}
          >
            {items.map((item, index) => (
              <Item key={getComponentKey(item, index)} {...item}>
                {item.label}
              </Item>
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

  renderContent = () => {
    const { renderItem, children } = this.props

    if (renderItem) {
      return renderItem(getCustomItemProps(this.props))
    }

    return (
      <Flexy gap="sm">
        <Flexy.Block>{children}</Flexy.Block>
        {this.renderSubMenuIndicator()}
      </Flexy>
    )
  }

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }
  setActionNodeRef = node => (this.actionNode = node)
  setWrapperNodeRef = node => (this.wrapperNode = node)
  setMenuNodeRef = node => (this.menuNode = node)

  render() {
    const { actionId } = this.props

    return (
      <ItemUI
        {...getValidProps(this.props)}
        onClick={this.handleOnClick}
        innerRef={this.setNodeRef}
      >
        <ActionUI
          id={actionId}
          innerRef={this.setActionNodeRef}
          className={classNames(
            this.hasSubMenu() && 'has-subMenu',
            'c-DropdownV2ItemAction'
          )}
        >
          {this.renderContent()}
        </ActionUI>
        {this.renderSubMenu()}
      </ItemUI>
    )
  }
}

export default Item
