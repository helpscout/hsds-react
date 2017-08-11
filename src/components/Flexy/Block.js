import React from 'react'
import classNames from '../../utilities/classNames'

const Block = props => {
  const className = classNames(
    'c-Flexy__block',
    props.className
  )

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default Block
