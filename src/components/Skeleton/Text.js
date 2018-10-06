import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import classNames from '../../utilities/classNames.ts'

export const propTypes = {
  heading: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

const defaultProps = {
  heading: false,
  style: {},
  width: '70%',
}

const Text = props => {
  const { className, children, heading, style, width, ...rest } = props

  const componentClassName = classNames(
    'c-SkeletonText',
    heading && 'is-heading',
    className
  )

  const componentStyle = Object.assign({}, style, { width })

  return (
    <Block className={componentClassName} style={componentStyle} {...rest} />
  )
}

Text.propTypes = propTypes
Text.defaultProps = defaultProps
Text.displayName = 'SkeletonText'

export default Text
