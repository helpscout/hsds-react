import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import RouteWrapper from '../RouteWrapper'
import classNames from 'classnames'
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

Link.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Opens link in a new tab. */
  external: PropTypes.bool,
  /** Address for the link. Default is `#`. */
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Callback function to retrieve the component's DOM node. */
  nodeRef: PropTypes.func,
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

export default RouteWrapper(Link)
