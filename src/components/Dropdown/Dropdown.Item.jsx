// Deprecated
/* istanbul ignore file */
import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { connect } from '@helpscout/wedux'
import Icon from '../Icon'
import Card from './Dropdown.Card'
import DropdownDivider from './Dropdown.Divider'
import DropdownHeader from './Dropdown.Header'
import Menu from './Dropdown.Menu'
import {
  ActionUI,
  ActionContentUI,
  ItemUI,
  SubMenuIncidatorUI,
  WrapperUI,
} from './Dropdown.css.js'
import { SELECTORS, getCustomItemProps, getItemProps } from './Dropdown.utils'
import { setMenuPositionStyles } from './Dropdown.renderUtils'
import classNames from 'classnames'
import { getComponentKey } from '../../utilities/component'
import DropdownItemSelectedCheck from './Dropdown.ItemSelectedCheck'

function noop() {}

export class DropdownItem extends React.PureComponent {
  node
  actionNode
  wrapperNode
  menuNode

  componentDidMount() {
    if (this.node) {
      this.renderMenu()
    }
  }

  handleOnClick = event => {
    const { label, onClick, preventSelect, value } = this.props
    const state = this.props.getState()

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

  hasSubMenu() {
    const { items } = this.props

    return !!(items && items.length)
  }

  renderMenu() {
    if (!this.hasSubMenu()) return

    const { contentWindow, dropRight, dropUp } = this.props

    // Async call to coordinate with Portal adjustments
    requestAnimationFrame(() => {
      if (this.menuNode && this.wrapperNode && this.node && this.actionNode) {
        setMenuPositionStyles({
          contentWindow,
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

  getItemProps = (item, index) => {
    const state = this.props.getState()
    return getItemProps(state, item)
  }

  getWrapperProps = () => {
    const { index, value } = this.props

    return {
      className: 'c-DropdownMenuWrapper',
      ref: this.setWrapperNodeRef,
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
                <DropdownItem
                  getState={getState}
                  renderItem={renderItem}
                  key={item.id || item.value || getComponentKey(item, index)}
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
      <SubMenuIncidatorUI className="c-DropdownItemSubMenuIndicator">
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
    const internalState = getState()
    const allowMultipleSelection =
      internalState != null && internalState.allowMultipleSelection

    if (allowMultipleSelection && renderItem == null) {
      return DropdownItemSelectedCheck(getCustomItemProps(this.props))
    }

    if (renderItem) {
      return renderItem(getCustomItemProps(this.props))
    }

    const hasSubMenu = this.hasSubMenu()
    const content = children || label || value

    if (!hasSubMenu) return content

    const componentClassName = classNames(
      hasSubMenu && 'has-subMenu',
      'c-DropdownItemAction'
    )

    const actionProps = {
      id: actionId,
      ref: this.setActionNodeRef,
      className: componentClassName,
    }

    return (
      <ActionUI {...actionProps}>
        <ActionContentUI className="c-DropdownItemActionContent">
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

  setMenuNodeRef = node => {
    this.menuNode = node
  }

  render() {
    const { className, disabled, href, isSelectionClearer, type } = this.props
    const hasSubMenu = this.hasSubMenu()

    const componentClassName = classNames(
      'c-DropdownItem',
      disabled && 'is-disabled',
      !hasSubMenu && 'is-option',
      isSelectionClearer && 'c-SelectionClearerItem',
      className
    )

    if (type === 'group' || type === 'header')
      return <DropdownHeader {...this.props} />
    if (type === 'divider') return <DropdownDivider />

    const selector = href ? 'a' : 'div'

    return (
      <ItemUI
        {...getValidProps(this.props)}
        className={componentClassName}
        aria-disabled={disabled}
        onClick={this.handleOnClick}
        ref={this.setNodeRef}
        role={hasSubMenu ? 'group' : 'option'}
        as={selector}
      >
        {this.renderContent()}
        {this.renderSubMenu()}
      </ItemUI>
    )
  }
}

DropdownItem.defaultProps = {
  contentWindow: window,
  'data-cy': 'DropdownItem',
  getState: noop,
  disabled: false,
  index: '0',
  innerRef: noop,
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

DropdownItem.propTypes = {
  actionId: PropTypes.string,
  className: PropTypes.string,
  contentWindow: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  disabled: PropTypes.bool,
  dropRight: PropTypes.bool,
  dropUp: PropTypes.bool,
  getState: PropTypes.func,
  href: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.string,
  innerRef: PropTypes.func,
  isHover: PropTypes.bool,
  isSelectionClearer: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.any),
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  preventSelect: PropTypes.bool,
  renderItem: PropTypes.func,
  subMenuId: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

const ConnectedItem = connect(
  // mapStateToProps
  state => {
    const { contentWindow, getState, renderItem, selectedItem } = state

    return {
      contentWindow,
      getState,
      renderItem,
      selectedItem,
    }
  }
)(DropdownItem)

export default ConnectedItem
