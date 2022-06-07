import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Nav from '../Nav'
import Toolbar from '../Toolbar'
import classNames from 'classnames'
import { TabBarUI, SecContentUI, ToolbarUI } from './TabBar.css'

export class TabBar extends React.Component {
  static className = 'c-TabBar'
  static Item = Nav.Item

  getClassName() {
    const { className } = this.props

    return classNames(TabBar.className, className)
  }

  render() {
    const { children, innerRef, secContent, align, ...rest } = this.props

    return (
      <TabBarUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
        align={align}
      >
        <ToolbarUI placement="top">
          <Toolbar.Item>
            <Nav>{children}</Nav>
          </Toolbar.Item>
          {secContent && (
            <SecContentUI align={align}>{secContent}</SecContentUI>
          )}
        </ToolbarUI>
      </TabBarUI>
    )
  }
}

function noop() {}

TabBar.defaultProps = {
  align: 'left',
  'data-cy': 'TabBar',
  innerRef: noop,
}

TabBar.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  /** A right or left aligned placeholder that will be render inside the toolbar as the secondary content */
  secContent: PropTypes.any,
  /** Alignment of the toolbar contents using flexbox */
  align: PropTypes.oneOf(['left', 'center', 'right']),
}

export default TabBar
