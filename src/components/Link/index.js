import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { shouldWordWrap } from '../../utilities/strings'
import RouteWrapper from '../RouteWrapper'

export const propTypes = {
  autoWordWrap: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  to: PropTypes.string,
  wordWrap: PropTypes.bool
}

const defaultProps = {
  autoWordWrap: true,
  external: false,
  href: '#',
  onBlur: noop,
  onClick: noop,
  onFocus: noop
}

const Link = props => {
  const {
    autoWordWrap,
    block,
    children,
    className,
    external,
    href,
    wordWrap,
    ...rest
  } = props

  const forceWordWrap = wordWrap || (autoWordWrap && shouldWordWrap(children))

  const componentClassName = classNames(
    'c-link',
    block && 'is-block',
    forceWordWrap && 'is-word-wrap',
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
