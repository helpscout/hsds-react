import React from 'react'
import classNames from '../../utilities/classNames'

const Item = props => {
  const className = classNames(
    'c-Flexy__item',
    props.className
  )

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default Item
