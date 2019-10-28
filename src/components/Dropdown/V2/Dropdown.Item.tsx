import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { connect } from '@helpscout/wedux'
import propConnect from '../../PropProvider/propConnect'
import Icon from '../../Icon'
import Card from './Dropdown.Card'
import Divider from './Dropdown.Divider'
import Header from './Dropdown.Header'
import Menu from './Dropdown.Menu'
import {
  ItemUI,
  ActionUI,
  ActionContentUI,
  WrapperUI,
  SubMenuIncidatorUI,
} from './Dropdown.css.js'
import { SELECTORS, getCustomItemProps, getItemProps } from './Dropdown.utils'
import { setMenuPositionStyles } from './Dropdown.renderUtils'
import { classNames } from '../../../utilities/classNames'
import {
  getComponentKey,
  namespaceComponent,
} from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { COMPONENT_KEY } from './Dropdown.utils'
import ItemSelectedCheck from './Dropdown.ItemSelectedCheck'

export interface Props {
  actionId?: string
  className?: string
  disabled: boolean
  dropRight: boolean
  dropUp: boolean
  getState: (...args: any[]) => void
  id?: string
  index: string
  ref: (node: HTMLElement) => void
  isHover: boolean
  isSelectionClearer: boolean
  items: Array<any>
  onMouseEnter: (...args: any[]) => void
  onMouseMove: (...args: any[]) => void
  onBlur: (...args: any[]) => void
  onClick: (...args: any[]) => void
  onFocus: (...args: any[]) => void
  preventSelect?: boolean
  renderItem?: (props: any) => void
  subMenuId?: string
  label: string
  type: string
  value: string
}

export class Item extends React.PureComponent<Props> {
  static defaultProps = {
    getState: noop,
    disabled: false,
    index: '0',
    ref: noop,
    isHover: false,
    isSelectionClearer: false,
    items: undefined,
    dropRight: true,
    dropUp: false,
    onMouseEnter: noop,
    onMouseMove: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
    preventSelect: false,
    label: '',
    type: 'item',
    value: '',
  }

  node: HTMLElement
  actionNode: HTMLElement
  wrapperNode: HTMLElement
  menuNode: HTMLElement | null

  componentDidMount() {
    /* istanbul ignore else */
    if (this.node) {
      this.renderMenu()
    }
  }

  handleOnClick = (event: Event) => {
    const { label, onClick, preventSelect, value } = this.props
    const state: any = this.props.getState()

    if (preventSelect) {
      onClick({ label, value }, event)
    } else if (
      state &&
      state.allowMultipleSelection &&
      state.selectionClearer
    ) {
      onClick(state, event)
    } else {
      onClick(event, { hasSubMenu: this.hasSubMenu() })
    }
  }

  hasSubMenu(): boolean {
    const { items } = this.props

    return !!(items && items.length)
  }

  renderMenu() {
    if (!this.hasSubMenu()) return

    const { dropRight, dropUp } = this.props

    // Async call to coordinate with Portal adjustments
    requestAnimationFrame(() => {
      /* istanbul ignore else */
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

  getItemProps = (item: any, index?: number) => {
    const state = this.props.getState()
    return getItemProps(state, item)
  }

  getWrapperProps = () => {
    const { index, value } = this.props

    return {
      className: 'c-DropdownV2MenuWrapper',
      wrapperRef: this.setWrapperNodeRef,
      [SELECTORS.indexAttribute]: index,
      [SELECTORS.valueAttribute]: value,
    }
  }

  renderSubMenu() {
    const { actionId, getState, renderItem, items, subMenuId } = this.props

    return (
      this.hasSubMenu() && (
        <WrapperUI {...this.getWrapperProps()}>
          <Card>
            <Menu
              aria-labelledby={actionId}
              menuRef={this.setMenuNodeRef}
              isSubMenu
              id={subMenuId}
            >
              {items.map((item, index) => (
                <Item
                  getState={getState}
                  renderItem={renderItem}
                  key={
                    item.id ||
                    item.value ||
                    /* istanbul ignore next */
                    getComponentKey(item, index)
                  }
                  {...this.getItemProps(item)}
                />
              ))}
            </Menu>
          </Card>
        </WrapperUI>
      )
    )
  }

  renderSubMenuIndicator() {
    const { dropRight } = this.props
    const icon = dropRight ? 'caret-right' : 'caret-left'

    return (
      <SubMenuIncidatorUI className="c-DropdownV2ItemSubMenuIndicator">
        <Icon name={icon} size="12" shade="extraMuted" />
      </SubMenuIncidatorUI>
    )
  }

  renderContent() {
    const {
      actionId,
      renderItem,
      children,
      label,
      value,
      getState,
    } = this.props
    const internalState: any = getState()
    const allowMultipleSelection =
      internalState != null && internalState.allowMultipleSelection

    if (allowMultipleSelection && renderItem == null) {
      return ItemSelectedCheck(getCustomItemProps(this.props))
    }

    if (renderItem) {
      return renderItem(getCustomItemProps(this.props))
    }

    const hasSubMenu = this.hasSubMenu()
    const content = children || label || value

    if (!hasSubMenu) return content

    const componentClassName = classNames(
      hasSubMenu && 'has-subMenu',
      'c-DropdownV2ItemAction'
    )

    const actionProps = {
      id: actionId,
      ref: this.setActionNodeRef,
      className: componentClassName,
    }

    return (
      <ActionUI {...actionProps}>
        <ActionContentUI className="c-DropdownV2ItemActionContent">
          {content}
        </ActionContentUI>
        {this.renderSubMenuIndicator()}
      </ActionUI>
    )
  }

  setNodeRef = node => {
    this.node = node
    this.props.ref(node)
  }
  setActionNodeRef = node => (this.actionNode = node)
  setWrapperNodeRef = node => (this.wrapperNode = node)
  setMenuNodeRef = node => {
    console.log('menuRef', node)
    this.menuNode = node
  }

  render() {
    const { className, disabled, type, isSelectionClearer } = this.props
    const hasSubMenu = this.hasSubMenu()

    const componentClassName = classNames(
      'c-DropdownV2Item',
      disabled && 'is-disabled',
      !hasSubMenu && 'is-option',
      isSelectionClearer && 'c-SelectionClearerItem',
      className
    )

    if (type === 'group' || type === 'header') return <Header {...this.props} />
    if (type === 'divider') return <Divider />

    return (
      <ItemUI
        {...getValidProps(this.props)}
        className={componentClassName}
        aria-disabled={disabled}
        onClick={this.handleOnClick}
        ref={this.setNodeRef}
        role={hasSubMenu ? 'group' : 'option'}
      >
        {this.renderContent()}
        {this.renderSubMenu()}
      </ItemUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Item)(Item)

const ConnectedItem: any = connect(
  // mapStateToProps
  (state: any) => {
    const { getState, renderItem, selectedItem } = state

    return {
      getState,
      renderItem,
      selectedItem,
    }
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedItem
