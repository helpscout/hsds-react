// Source
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/NavLink.js

import * as React from 'react'
import { Route } from 'react-router-dom'
import propConnect from '../PropProvider/propConnect'
import Link from '../Link'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './NavLink.utils'

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

  /* istanbul ignore next */
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
  style: {},
}

const PropConnectedComponent = propConnect(COMPONENT_KEY, { pure: false })(
  NavLink
)

export default PropConnectedComponent
