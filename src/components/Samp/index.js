import React from 'react'
import {default as Text, propTypes as textPropTypes} from '../Text'

export const propTypes = textPropTypes

const Samp = props => {
  const {
    children
  } = props

  return (
    <Text {...props} selector='samp'>
      {children}
    </Text>
  )
}

Samp.propTypes = propTypes

export default Samp
