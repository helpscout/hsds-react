import React from 'react'
import PropTypes from 'prop-types'
import Block from './Card.Block'
import classNames from 'classnames'
import { CardUI } from './Card.css'

function noop() {}

class Card extends React.PureComponent {
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

Card.propTypes = {
  autoWordWrap: PropTypes.bool,
  borderless: PropTypes.bool,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
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

Card.defaultProps = {
  borderless: false,
  'data-cy': 'Card',
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

Card.propTypes = {
  autoWordWrap: PropTypes.bool,
  /** Removes the border from the component. */
  borderless: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Adds flexbox styles to the component. */
  flex: PropTypes.bool,
  floating: PropTypes.bool,
  /** Adds full height styles. Often used with flex containers. */
  fullHeight: PropTypes.bool,
  /** Adds a hover style to the component. */
  hover: PropTypes.bool,
  innerRef: PropTypes.func,
  /** Adds an `href` to the component. Transforms it into an `<a>` tag. */
  href: PropTypes.string,
  /** Callback function to retrieve the component's DOM node. */
  nodeRef: PropTypes.func,
  /** Callback when the component is blurred. */
  onBlur: PropTypes.func,
  /** Callback when the component is clicked. */
  onClick: PropTypes.func,
  /** Callback when the component is focused. */
  onFocus: PropTypes.func,
  /** Removes the padding within the component. */
  seamless: PropTypes.bool,
  /** Determines the HTML tag for the component. */
  selector: PropTypes.string,
  to: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Card
