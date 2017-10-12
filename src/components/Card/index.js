import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { blockSelectorTagTypes } from '../../constants/propTypes'
import Block from './Block'

export const propTypes = {
  borderless: PropTypes.bool,
  className: PropTypes.string,
  floating: PropTypes.bool,
  flex: PropTypes.bool,
  hover: PropTypes.bool,
  href: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFocus: PropTypes.func,
  seamless: PropTypes.bool,
  selector: blockSelectorTagTypes
}

const defaultProps = {
  hover: false,
  onBlur: noop,
  onClick: false,
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
    hover,
    href,
    onClick,
    seamless,
    selector,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Card',
    (onClick || href) && 'is-clickable',
    (onClick || hover || href) && 'is-hoverable',
    borderless && 'is-borderless',
    floating && 'is-floating',
    flex && 'is-flex',
    seamless && 'is-seamless',
    className
  )

  const selectorTag = href ? 'a' : selector

  const element = React.createElement(
    selectorTag,
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
