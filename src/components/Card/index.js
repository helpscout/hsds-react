import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/constants'

const propTypes = {
  className: PropTypes.string,
  hover: PropTypes.bool,
  href: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFocus: PropTypes.func,
  seamless: PropTypes.bool,
  selector: PropTypes.string
}
const defaultProps = {
  className: '',
  hover: false,
  href: '',
  onBlur: noop,
  onClick: false,
  onFocus: noop,
  seamless: false,
  selector: 'div'
}

const Card = props => {
  const { hover, href, onClick, seamless, selector } = props

  const className = classNames(
    'c-Card',
    (onClick || href) && 'is-clickable',
    (onClick || hover || href) && 'is-hoverable',
    seamless && 'is-seamless',
    props.className
  )

  const selectorTag = href ? 'a' : selector

  const element = React.createElement(
    selectorTag,
    {
      ...props,
      className
    },
    props.children
  )

  return element
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps

export default Card
