// Deprecated
/* istanbul ignore file */
import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { connect } from '@helpscout/wedux'
import { MenuWrapperUI, MenuUI } from './Dropdown.css.js'
import ScrollLock from '../ScrollLock'
import classNames from 'classnames'
import { noop } from '../../utilities/other'

export class DropdownMenu extends React.PureComponent {
  getStyles() {
    const { style, zIndex } = this.props

    return { ...style, zIndex }
  }

  getWrapperStyles() {
    const { wrapperStyles } = this.props

    return { ...wrapperStyles }
  }

  renderMenu() {
    const {
      children,
      className,
      menuRef,
      innerRef,
      isSubMenu,
      renderMenu,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-DropdownMenu',
      isSubMenu && 'is-subMenu',
      className
    )

    const menuProps = {
      ...getValidProps(rest),
      children,
      className: componentClassName,
      ref: renderMenu ? undefined : menuRef,
      style: this.getStyles(),
    }

    const menuMarkup = renderMenu ? (
      renderMenu(menuProps)
    ) : (
      <MenuUI {...menuProps} />
    )

    return (
      <MenuWrapperUI
        className="c-DropdownMenuWrapper"
        ref={innerRef}
        style={this.getWrapperStyles()}
      >
        {menuMarkup}
      </MenuWrapperUI>
    )
  }

  render() {
    const { withScrollLock } = this.props

    return withScrollLock ? (
      <ScrollLock stopPropagation>{this.renderMenu()}</ScrollLock>
    ) : (
      this.renderMenu()
    )
  }
}

DropdownMenu.defaultProps = {
  'data-cy': 'DropdownMenu',
  menuRef: noop,
  innerRef: noop,
  isSubMenu: false,
  role: 'listbox',
  style: {},
  withScrollLock: true,
  wrapperStyles: {},
  zIndex: 1015,
}

DropdownMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  id: PropTypes.string,
  menuRef: PropTypes.func,
  innerRef: PropTypes.func,
  isSubMenu: PropTypes.bool,
  renderMenu: PropTypes.func,
  style: PropTypes.object,
  withScrollLock: PropTypes.bool,
  wrapperStyles: PropTypes.object,
  zIndex: PropTypes.number,
}

const ConnectedMenu = connect(
  // mapStateToProps
  state => {
    const { renderMenu, withScrollLock } = state

    return {
      renderMenu,
      withScrollLock,
    }
  }
)(DropdownMenu)

export default ConnectedMenu
