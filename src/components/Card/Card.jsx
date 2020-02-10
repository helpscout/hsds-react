import React from 'react'
import PropTypes from 'prop-types'
import Block from './Card.Block'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { CardUI } from './Card.css'

class Card extends React.PureComponent {
  static propTypes = {
    autoWordWrap: PropTypes.bool,
    borderless: PropTypes.bool,
    className: PropTypes.string,
    floating: PropTypes.bool,
    flex: PropTypes.bool,
    fullHeight: PropTypes.bool,
    hover: PropTypes.bool,
    href: PropTypes.string,
    innerRef: PropTypes.func,
    nodeRef: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    seamless: PropTypes.bool,
    selector: PropTypes.string,
    to: PropTypes.string,
  }

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
      ref: innerRef,
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
