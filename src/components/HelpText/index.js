import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Text from '../Text'

const propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  state: PropTypes.string
}

const HelpText = props => {
  const {
    children,
    muted,
    state
  } = props

  const className = classNames(
    'c-HelpText',
    muted && `is-muted`,
    state && `is-${state}`,
    props.className
  )

  return (
    <div className={className}>
      <Text size={13}>{children}</Text>
    </div>
  )
}

HelpText.propTypes = propTypes

export default HelpText
