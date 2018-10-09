import React from 'react'
import { default as Text, propTypes as textProps } from './Text'
import { classNames } from '../../utilities/classNames'

export const propTypes = textProps

const defaultProps = {
  style: {},
  width: '70%',
}

const Heading = props => {
  const { className, ...rest } = props

  const componentClassName = classNames('c-SkeletonHeading', className)

  return <Text className={componentClassName} heading {...rest} />
}

Heading.propTypes = propTypes
Heading.defaultProps = defaultProps
Heading.displayName = 'SkeletonHeading'

export default Heading
