import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Input from '../Input'
import Text from '../Text'

export const ConditionFieldStatic = props => {
  const { children, ...rest } = props

  return (
    <Input.Static isCenterAlign {...getValidProps(rest)}>
      <Text block shade="faint">
        {children}
      </Text>
    </Input.Static>
  )
}

ConditionFieldStatic.defaultProps = {
  'data-cy': 'ConditionFieldStatic',
}

ConditionFieldStatic.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ConditionFieldStatic
