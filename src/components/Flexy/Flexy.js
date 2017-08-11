import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import Item from './Item'
import classNames from '../../utilities/classNames'

const propTypes = {
  align: PropTypes.string,
  className: PropTypes.string,
  gap: PropTypes.string,
  just: PropTypes.string
}

const Flexy = props => {
  const {
    align,
    gap,
    just
  } = props

  const className = classNames(
    'c-Flexy',
    align && `is-${align}`,
    gap && `c-Flexy--gap-${gap}`,
    just && `c-Flexy--just-${just}`
    props.className
  )

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

Flexy.PropTypes = propTypes
Flexy.Block = Block
Flexy.Item = Item

export default Flexy
