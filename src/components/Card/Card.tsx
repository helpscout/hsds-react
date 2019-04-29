import * as React from 'react'
import { BlockSelectorTag } from '../../constants/types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Link from '../Link/index'
import Block from './Block'
import styled from '../styled/index'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import css from './styles/Card.css'
import { COMPONENT_KEY } from './Card.utils'

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
  innerRef: (node: HTMLElement) => void
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
    innerRef: noop,
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
      innerRef,
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
          {...rest}
          autoWordWrap={autoWordWrap}
          block
          className={componentClassName}
          onClick={onClick}
          href={href}
          to={to}
          innerRef={innerRef}
          nodeRef={nodeRef}
        >
          {children}
        </Link>
      ) : (
        React.createElement(
          selector,
          {
            ...getValidProps(rest),
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

const StyledCard = styled(Card)(css)

namespaceComponent(COMPONENT_KEY.Card)(StyledCard)

export default propConnect('Card')(Card)
