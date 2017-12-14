import React from 'react'
import PropTypes from 'prop-types'
import { default as Link, propTypes as linkPropTypes } from '../Link'
import Block from './Block'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { blockSelectorTagTypes } from '../../constants/propTypes'

export const propTypes = Object.assign({}, linkPropTypes, {
  borderless: PropTypes.bool,
  className: PropTypes.string,
  floating: PropTypes.bool,
  flex: PropTypes.bool,
  fullHeight: PropTypes.bool,
  hover: PropTypes.bool,
  href: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  seamless: PropTypes.bool,
  selector: blockSelectorTagTypes
})

const defaultProps = {
  borderless: false,
  flex: false,
  floating: false,
  fullHeight: false,
  hover: false,
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  seamless: false,
  selector: 'div'
}

const Card = props => {
  const {
    borderless,
    className,
    children,
    floating,
    flex,
    fullHeight,
    hover,
    href,
    onClick,
    seamless,
    selector,
    to,
    ...rest
  } = props

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

  const element = href || to ? (
    <Link
      block
      className={componentClassName}
      onClick={onClick}
      href={href}
      to={to}
      {...rest}
    >
      {children}
    </Link>
  ) : React.createElement(
    selector,
    {
      ...rest,
      className: componentClassName,
      href,
      onClick
    },
    children
  )

  return element
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps
Card.Block = Block

export default Card
