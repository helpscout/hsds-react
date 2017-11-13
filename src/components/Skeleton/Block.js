import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const Block = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-SkeletonBlock',
    className
  )

  return (
    <div className={componentClassName} />
  )
}

Block.displayName = 'SkeletonBlock'

export default Block
