import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Text from '../Text'

const propTypes = {
  className: PropTypes.string,
  for: PropTypes.string,
  state: PropTypes.string
}

const Label = props => {
  const {
    state
  } = props

  const className = classNames(
    'c-Label',
    state && `is-${state}`,
    props.className
  )

  return (
    <label className={className} htmlFor={props.for}>
      <Text faint>
        {props.children}
      </Text>
    </label>
  )
}

Label.propTypes = propTypes

export default Label
