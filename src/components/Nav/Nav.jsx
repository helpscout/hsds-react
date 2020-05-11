import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Item from './Nav.Item'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { NavUI, ListUI } from './Nav.css'

export class Nav extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
  }

  static className = 'c-Nav'
  static defaultProps = {
    innerRef: noop,
  }

  static Item = Item

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

export default Nav
