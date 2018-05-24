import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Text from '../Text'
import { sizeTypes } from '../Text/propTypes'
import { stateTypes } from '../../constants/propTypes'
import { isString } from '../../utilities/strings'

export const propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  size: sizeTypes,
  state: stateTypes,
}

const defaultProps = {
  size: '13',
}

const HelpText = props => {
  const { children, className, muted, size, state, ...rest } = props

  const componentClassName = classNames(
    'c-HelpText',
    muted && `is-muted`,
    state && `is-${state}`,
    className
  )

  const contentMarkup = isString(children) ? (
    <Text className="c-HelpText__text" size={size}>
      {children}
    </Text>
  ) : (
    children
  )

  return (
    <div className={componentClassName} {...rest}>
      {contentMarkup}
    </div>
  )
}

HelpText.propTypes = propTypes
HelpText.defaultProps = defaultProps

export default HelpText
