// Source
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js

import React from 'react'
import Link from '../Link'
import classNames from 'classnames'
import { Route } from 'react-router-dom'

export const NavLink = ({
  'aria-current': ariaCurrent,
  activeClassName,
  activeStyle,
  children,
  className,
  exact,
  isActive: getIsActive,
  location,
  render,
  strict,
  style,
  to,
  ...rest
}) => {
  const path = typeof to === 'object' ? to.pathname : to

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')

  return (
    <Route
      path={escapedPath}
      exact={exact}
      strict={strict}
      location={location}
      children={({ location, match }) => {
        const isActive = !!(getIsActive ? getIsActive(match, location) : match)

        const componentClassName = classNames(
          NavLink.className,
          isActive ? activeClassName : '',
          className
        )

        return (
          <Link
            {...rest}
            to={to}
            className={componentClassName}
            style={isActive ? { ...style, ...activeStyle } : style}
            aria-current={(isActive && ariaCurrent) || null}
          >
            {render ? render({ isActive }) : children}
          </Link>
        )
      }}
    />
  )
}

NavLink.className = 'c-NavLink'

NavLink.defaultProps = {
  'aria-current': 'page',
  activeClassName: 'active is-active',
  activeStyle: {},
  'data-cy': 'NavLink',
  style: {},
}

export default NavLink
