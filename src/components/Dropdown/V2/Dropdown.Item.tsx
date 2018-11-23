import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { connect } from 'unistore/react'
import renderSpy from '@helpscout/react-utils/dist/renderSpy'
import propConnect from '../../PropProvider/propConnect'
import Flexy from '../../Flexy'
import Icon from '../../Icon'
import Menu from './Dropdown.Menu'
import {
  ItemUI,
  ActionUI,
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
  value: string
}

export class Item extends React.PureComponent<Props> {
  static defaultProps = {
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
    value: '',
  }

  static contextTypes = {
    getState: noop,
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
    const state = this.context.getState()
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
              <Item
                key={getComponentKey(item, index)}
                {...this.getItemProps(item)}
              />
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
          <SubMenuIncidatorUI className="c-DropdownV2Item__subMenuIndicator">
            <Icon name={icon} size="12" shade="extraMuted" />
          </SubMenuIncidatorUI>
        </Flexy.Item>
      )
    )
  }

  renderContent = () => {
    const { renderItem, children, label } = this.props

    if (renderItem) {
      return renderItem(getCustomItemProps(this.props))
    }

    const content = children || label

    return (
      <Flexy gap="sm">
        <Flexy.Block>{content}</Flexy.Block>
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
    const { actionId, className, disabled } = this.props

    const componentClassName = classNames(
      'c-DropdownV2Item',
      disabled && 'is-disabled',
      className
    )

    return (
      <ItemUI
        {...getValidProps(this.props)}
        className={componentClassName}
        aria-disabled={disabled}
        onClick={this.handleOnClick}
        innerRef={this.setNodeRef}
        role={this.hasSubMenu() ? 'group' : 'option'}
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

namespaceComponent(COMPONENT_KEY.Item)(Item)
const PropConnectedComponent = propConnect(COMPONENT_KEY.Item)(Item)

const ConnectedItem: any = connect(
  // mapStateToProps
  (state: any) => {
    const { renderItem } = state

    return {
      renderItem,
    }
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default renderSpy({ id: 'Dropdown.Item' })(ConnectedItem)
