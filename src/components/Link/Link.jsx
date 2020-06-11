import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import RouteWrapper from '../RouteWrapper'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { wordHasSpaces } from '../../utilities/strings'
import { LinkUI } from './Link.css'

export class Link extends React.PureComponent {
  getHref() {
    const { href, voidOnClick } = this.props

    if (voidOnClick) {
      // eslint-disable-next-line no-script-url
      return 'javascript:void(0);'
    }

    return href
  }

  render() {
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
      ...rest
    } = this.props
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

    return (
      <LinkUI
        {...getValidProps(rest)}
        className={componentClassName}
        target={linkTarget}
        rel={rel}
        ref={nodeRef}
        href={this.getHref()}
      >
        {children}
      </LinkUI>
    )
  }
}

Link.propTypes = {
  autoWordWrap: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  nodeRef: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  rel: PropTypes.string,
  noUnderline: PropTypes.bool,
  target: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  voidOnClick: PropTypes.bool,
  wordWrap: PropTypes.bool,
}

Link.defaultProps = {
  autoWordWrap: true,
  block: false,
  'data-cy': 'Link',
  external: false,
  href: '#',
  nodeRef: noop,
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  voidOnClick: false,
}

export default RouteWrapper(Link)
