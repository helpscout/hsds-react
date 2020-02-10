import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import RouteWrapper from '../RouteWrapper'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { wordHasSpaces } from '../../utilities/strings'
import { LinkUI } from './Link.css'

export class Link extends React.PureComponent {
  static propTypes = {
    autoWordWrap: PropTypes.bool,
    block: PropTypes.bool,
    className: PropTypes.string,
    external: PropTypes.bool,
    href: PropTypes.string,
    nodeRef: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    rel: PropTypes.string,
    noUnderline: PropTypes.bool,
    target: PropTypes.string,
    to: PropTypes.string,
    voidOnClick: PropTypes.bool,
    wordWrap: PropTypes.bool,
  }

  static defaultProps = {
    autoWordWrap: true,
    block: false,
    external: false,
    href: '#',
    nodeRef: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
    voidOnClick: false,
  }

  getHref() {
    const { href, voidOnClick } = this.props

    if (voidOnClick) {
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

export default RouteWrapper(Link)
