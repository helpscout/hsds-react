import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Text from '../Text'

export const propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.string
}

const defaultProps = {
  size: 13
}

const HelpText = props => {
  const {
    children,
    className,
    muted,
    size,
    state,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-HelpText',
    muted && `is-muted`,
    state && `is-${state}`,
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      <Text size={size}>{children}</Text>
    </div>
  )
}

HelpText.propTypes = propTypes
HelpText.defaultProps = defaultProps

export default HelpText
