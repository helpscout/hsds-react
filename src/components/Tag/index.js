import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Text from '../Text'
import { tagColorTypes } from './propTypes'

export const propTypes = {
  allCaps: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: tagColorTypes,
  filled: PropTypes.bool,
  pulsing: PropTypes.bool
}

const defaultProps = {
  color: 'grey'
}

const Tag = props => {
  const {
    allCaps,
    className,
    children,
    color,
    filled,
    pulsing,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Tag',
    color && `is-${color}`,
    filled && 'is-filled',
    pulsing && 'is-pulsing',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      <Text allCaps={allCaps} size={allCaps ? 11 : 13} lineHeightReset>
        {children}
      </Text>
    </div>
  )
}

Tag.propTypes = propTypes
Tag.defaultProps = defaultProps
Tag.displayName = 'Tag'

export default Tag
