import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import classNames from '../../utilities/classNames'

export const propTypes = {
  style: PropTypes.object,
  width: PropTypes.oneOfTypes([PropTypes.number, PropTypes.string])
}

const defaultProps = {
  style: {},
  width: '70%'
}

const Text = props => {
  const {
    className,
    children,
    style,
    width,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-SkeletonText',
    className
  )

  const componentStyle = Object.assign(style, { width })

  return (
    <Block
      className={componentClassName}
      style={componentStyle}
      {...rest}
    />
  )
}

Text.displayName = 'SkeletonText'

export default Text
