import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import RouteWrapper from '../RouteWrapper'

export const propTypes = {
  block: PropTypes.bool,
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
    block,
    children,
    className,
    external,
    href,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Link',
    block && 'is-block',
    className
  )

  const target = external ? '_blank' : undefined
  const rel = external ? 'noopener noreferrer' : undefined

  return (
    <a className={componentClassName} target={target} rel={rel} href={href} {...rest}>
      {children}
    </a>
  )
}

Link.propTypes = propTypes
Link.defaultProps = defaultProps

export default RouteWrapper(Link)
