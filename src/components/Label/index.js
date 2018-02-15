import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import { stateTypes } from '../../constants/propTypes'
import classNames from '../../utilities/classNames'
import { isString } from '../../utilities/strings'

export const propTypes = {
  className: PropTypes.string,
  for: PropTypes.string,
  state: stateTypes
}

const Label = props => {
  const {
    className,
    children,
    for: htmlFor,
    state,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Label',
    state && `is-${state}`,
    className
  )

  const contentMarkup = isString(children) ? (
    <Text className='c-Label__text' faint>
      {children}
    </Text>
  ) : children

  return (
    <label className={componentClassName} htmlFor={htmlFor} {...rest}>
      {contentMarkup}
    </label>
  )
}

Label.propTypes = propTypes

export default Label
