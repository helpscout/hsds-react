import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import isString from 'lodash.isstring'
import isNil from 'lodash.isnil'
import { LinkUI } from './Link.css'
import { Link as ReactRouterLink } from 'react-router-dom'

function noop() {}

const WrappedLink = forwardRef(function Link(props, ref) {
  const {
    autoWordWrap,
    block,
    children,
    className,
    external,
    target,
    nodeRef,
    noUnderline,
    wordWrap,
    href,
    voidOnClick,
    to,
    ...rest
  } = props

  const forceWordWrap = wordWrap || (autoWordWrap && !wordHasSpaces(children))
  const componentClassName = classNames(
    'c-Link',
    block && 'is-block',
    forceWordWrap && 'is-word-wrap',
    noUnderline && 'is-no-underline',
    className
  )
  const isTargetExternal = (target && target === '_blank') || external
  const linkTarget = target || external ? '_blank' : undefined
  const rel = isTargetExternal ? 'noopener noreferrer' : undefined

  // eslint-disable-next-line no-script-url
  const linkHref = voidOnClick ? 'javascript:void(0);' : href

  return (
    <LinkUI
      {...getValidProps(rest)}
      className={componentClassName}
      target={linkTarget}
      rel={rel}
      ref={ref || nodeRef}
      href={linkHref}
      to={to}
      as={to ? ReactRouterLink : 'a'}
    >
      {children}
    </LinkUI>
  )
})

WrappedLink.defaultProps = {
  autoWordWrap: true,
  block: false,
  'data-cy': 'Link',
  external: false,
  href: '#',
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  voidOnClick: false,
}

WrappedLink.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Opens link in a new tab. */
  external: PropTypes.bool,
  /** Address for the link. Default is `#`. */
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Callback function when the component is blurred. */
  onBlur: PropTypes.func,
  /** Callback function when the component is clicked. */
  onClick: PropTypes.func,
  /** Callback function when the component is focused. */
  onFocus: PropTypes.func,
  /** React Router path to navigate on click. */
  to: PropTypes.string,
  /** Disables click event. */
  voidOnClick: PropTypes.bool,
  autoWordWrap: PropTypes.bool,
  block: PropTypes.bool,
  rel: PropTypes.string,
  noUnderline: PropTypes.bool,
  target: PropTypes.string,
  wordWrap: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export function wordHasSpaces(word) {
  if (isNil(word) || !isString(word)) return false

  return word.trim().indexOf(' ') > 0
}

export default WrappedLink
