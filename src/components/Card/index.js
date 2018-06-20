// @flow
import React, { PureComponent as Component } from 'react'
import Link from '../Link'
import Block from './Block'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { blockSelectorTagTypes } from '../../constants/propTypes'
import type { BlockSelectorTag } from '../../constants/types'

type Props = {
  autoWordWrap?: boolean,
  borderless?: boolean,
  className?: string,
  children?: any,
  floating: boolean,
  flex: boolean,
  fullHeight: boolean,
  hover: boolean,
  href?: string,
  nodeRef: () => void,
  onBlur: (event: Event) => void,
  onClick: (event: Event) => void,
  onFocus: (event: Event) => void,
  seamless: boolean,
  selector: BlockSelectorTag,
  to?: string,
}

class Card extends Component<Props> {
  static defaultProps = {
    borderless: false,
    flex: false,
    floating: false,
    fullHeight: false,
    hover: false,
    nodeRef: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
    seamless: false,
    selector: 'div',
  }
  static Block = Block
  node = null

  componentWillUnmount() {
    this.node = null
  }

  render() {
    const {
      autoWordWrap,
      borderless,
      className,
      children,
      floating,
      flex,
      fullHeight,
      hover,
      href,
      nodeRef,
      onClick,
      seamless,
      selector,
      to,
      ...rest
    } = this.props

    const hasOnClick = onClick !== noop

    const componentClassName = classNames(
      'c-Card',
      (hasOnClick || href || to) && 'is-clickable',
      (hasOnClick || hover || href || to) && 'is-hoverable',
      borderless && 'is-borderless',
      floating && 'is-floating',
      flex && 'is-flex',
      fullHeight && 'is-fullHeight',
      href && 'is-link',
      seamless && 'is-seamless',
      className
    )

    const element =
      href || to ? (
        <Link
          autoWordWrap={autoWordWrap}
          block
          className={componentClassName}
          onClick={onClick}
          href={href}
          to={to}
          nodeRef={nodeRef}
          {...rest}
        >
          {children}
        </Link>
      ) : (
        React.createElement(
          selector,
          {
            ...rest,
            className: componentClassName,
            href,
            onClick,
            ref: nodeRef,
          },
          children
        )
      )

    return element
  }
}

export default Card
