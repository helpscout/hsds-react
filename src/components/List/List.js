import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Item from './Item'

export const propTypes = {
  border: PropTypes.oneOf(['line', 'dot', '']),
  className: PropTypes.string,
  size: PropTypes.oneOf([
    'xs',
    'sm',
    'md',
    'lg',
    ''
  ]),
  type: PropTypes.oneOf([
    'bullet',
    'inline',
    'number',
    ''
  ])
}

const defaultProps = {
  role: 'list'
}

const List = props => {
  const {
    border,
    children,
    className,
    role,
    size,
    type,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-List',
    border === 'dot' && 'c-List--dotted',
    border === 'line' && 'c-List--bordered',
    size && `c-List--${size}`,
    type && `c-List--${type}`,
    className
  )

  const selectorTag = (
    type === 'bullet' ? 'ul'
    : type === 'number' ? 'ol'
    : 'ul'
  )

  return React.createElement(selectorTag, {
    className: componentClassName,
    children,
    role,
    ...rest
  })
}

List.propTypes = propTypes
List.defaultProps = defaultProps
List.Item = Item

export default List
