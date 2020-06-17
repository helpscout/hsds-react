import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import NavItem from './Nav.Item'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { NavUI, ListUI } from './Nav.css'

export class Nav extends React.Component {
  static className = 'c-Nav'
  static Item = NavItem

  getClassName() {
    const { className } = this.props

    return classNames(Nav.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <NavUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      >
        <ListUI className="c-NavList">{children}</ListUI>
      </NavUI>
    )
  }
}

Nav.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
}

Nav.defaultProps = {
  'data-cy': 'Nav',
  innerRef: noop,
}

export default Nav
