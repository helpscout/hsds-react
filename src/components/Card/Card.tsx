import * as React from 'react'
import { BlockSelectorTag } from '../../constants/types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Link from '../Link'
import Block from './Card.Block'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { CardUI } from './styles/Card.css'

export type Props = {
  autoWordWrap?: boolean
  borderless?: boolean
  className?: string
  children?: any
  floating: boolean
  flex: boolean
  fullHeight: boolean
  hover: boolean
  href?: string
  ref: (node: HTMLElement) => void
  nodeRef: () => void
  onBlur: (event: Event) => void
  onClick: (event: Event) => void
  onFocus: (event: Event) => void
  seamless: boolean
  selector: BlockSelectorTag
  to?: string
}

class Card extends React.PureComponent<Props> {
  static defaultProps = {
    borderless: false,
    flex: false,
    floating: false,
    fullHeight: false,
    hover: false,
    ref: noop,
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
      ref,
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

    const sharedProps = {
      className: componentClassName,
      onClick,
    }

    const extraStaticProps = {
      as: selector,
      href,

      ref: nodeRef,
    }

    const extraLinksProps = {
      autoWordWrap,
      block: true,
      href,
      to,
      ref,
      nodeRef,
    }

    const props =
      href || to
        ? { ...sharedProps, ...extraLinksProps }
        : { ...sharedProps, ...extraStaticProps }

    return (
      <CardUI {...rest} {...props}>
        {children}
      </CardUI>
    )
  }
}

export default Card
