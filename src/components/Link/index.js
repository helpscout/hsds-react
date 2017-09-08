import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouteLink } from 'react-router-dom'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  className: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  to: PropTypes.string
}

const defaultProps = {
  external: false,
  href: '#',
  onBlur: noop,
  onClick: noop,
  onFocus: noop
}

const Link = props => {
  const {
    className, external, to, href, ...rest } = props

  const componentClassName = classNames('c-link', className)

  const target = external ? '_blank' : undefined
  const rel = external ? 'noopener noreferrer' : undefined

  // Note: If we're going to support React Router, then the `to` prop
  // should render React Router's <Link> component.

  const linkMarkup = to ? (
    <RouteLink className={componentClassName} target={target} rel={rel} to={to} {...rest}>
      {props.children}
    </RouteLink>
  ) : (
    <a className={componentClassName} target={target} rel={rel} href={href} {...rest}>
      {props.children}
    </a>
  )

  return linkMarkup
}

Link.propTypes = propTypes
Link.defaultProps = defaultProps

export default Link
