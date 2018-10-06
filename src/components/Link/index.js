// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames.ts'
import { noop } from '../../utilities/other'
import { wordHasSpaces } from '../../utilities/strings'
import RouteWrapper from '../RouteWrapper'

type Props = {
  autoWordWrap: boolean,
  block: boolean,
  className?: string,
  children?: any,
  external: boolean,
  href: string,
  nodeRef: () => void,
  onBlur: () => void,
  onClick: () => void,
  onFocus: () => void,
  rel: string,
  noUnderline: boolean,
  target?: string,
  to: string,
  wordWrap: boolean,
}

class Link extends Component<Props> {
  static defaultProps = {
    autoWordWrap: true,
    block: false,
    external: false,
    href: '#',
    nodeRef: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
  }

  render() {
    const {
      autoWordWrap,
      block,
      children,
      className,
      external,
      href,
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
      <a
        {...getValidProps(rest)}
        className={componentClassName}
        target={linkTarget}
        rel={rel}
        ref={nodeRef}
        href={href}
      >
        {children}
      </a>
    )
  }
}

export default RouteWrapper(Link)
