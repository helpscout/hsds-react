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

export interface Props {
  actionId?: string
  className?: string
  disabled: boolean
  dropRight: boolean
  dropUp: boolean
  getState: (...args: any[]) => void
  id?: string
  index: string
  innerRef: (node: HTMLElement) => void
  isHover: boolean
  items: Array<any>
  onMouseEnter: (...args: any[]) => void
  onMouseMove: (...args: any[]) => void
  onBlur: (...args: any[]) => void
  onClick: (...args: any[]) => void
  onFocus: (...args: any[]) => void
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
    innerRef: noop,
    isHover: false,
    items: undefined,
    dropRight: true,
    dropUp: false,
    onMouseEnter: noop,
    onMouseMove: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
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
    const { onClick } = this.props

    onClick(event, { hasSubMenu: this.hasSubMenu() })
  }

  hasSubMenu = (): boolean => {
    const { items } = this.props

    return !!(items && items.length)
  }

  renderMenu = () => {
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
      innerRef: this.setWrapperNodeRef,
      [SELECTORS.indexAttribute]: index,
      [SELECTORS.valueAttribute]: value,
    }
  }

  renderSubMenu = () => {
    const { actionId, getState, renderItem, items, subMenuId } = this.props

    return (
      this.hasSubMenu() && (
        <WrapperUI {...this.getWrapperProps()}>
          <Card>
            <Menu
              aria-labelledby={actionId}
              innerRef={this.setMenuNodeRef}
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

  renderSubMenuIndicator = () => {
    const { dropRight } = this.props
    const icon = dropRight ? 'caret-right' : 'caret-left'

    return (
      <SubMenuIncidatorUI className="c-DropdownV2ItemSubMenuIndicator">
        <Icon name={icon} size="12" shade="extraMuted" />
      </SubMenuIncidatorUI>
    )
  }

  renderContent = () => {
    const { actionId, renderItem, children, label } = this.props

    if (renderItem) {
      return renderItem(getCustomItemProps(this.props))
    }

    const hasSubMenu = this.hasSubMenu()
    const content = children || label

    if (!hasSubMenu) return content

    const componentClassName = classNames(
      hasSubMenu && 'has-subMenu',
      'c-DropdownV2ItemAction'
    )

    const actionProps = {
      id: actionId,
      innerRef: this.setActionNodeRef,
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
    this.props.innerRef(node)
  }
  setActionNodeRef = node => (this.actionNode = node)
  setWrapperNodeRef = node => (this.wrapperNode = node)
  setMenuNodeRef = node => (this.menuNode = node)

  render() {
    const { className, disabled, type } = this.props
    const hasSubMenu = this.hasSubMenu()

    const componentClassName = classNames(
      'c-DropdownV2Item',
      disabled && 'is-disabled',
      !hasSubMenu && 'is-option',
      className
    )

    if (type === 'group') return <Header {...this.props} />
    if (type === 'divider') return <Divider />

    return (
      <ItemUI
        {...getValidProps(this.props)}
        className={componentClassName}
        aria-disabled={disabled}
        onClick={this.handleOnClick}
        innerRef={this.setNodeRef}
        role={hasSubMenu ? 'group' : 'option'}
      >
        {this.renderContent()}
        {this.renderSubMenu()}
      </ItemUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Item)(Item)
const PropConnectedComponent = propConnect(COMPONENT_KEY.Item)(Item)

const ConnectedItem: any = connect(
  // mapStateToProps
  (state: any) => {
    const { getState, renderItem } = state

    return {
      getState,
      renderItem,
    }
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedItem
