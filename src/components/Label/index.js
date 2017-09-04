import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Text from '../Text'

export const propTypes = {
  className: PropTypes.string,
  for: PropTypes.string,
  state: PropTypes.string
}

const Label = props => {
  const {
    className,
    for: htmlFor,
    state,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Label',
    state && `is-${state}`,
    className
  )

  return (
    <label className={componentClassName} htmlFor={htmlFor} {...rest}>
      <Text faint>
        {props.children}
      </Text>
    </label>
  )
}

Label.propTypes = propTypes

export default Label
