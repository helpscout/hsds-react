import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Operator from '../Condition/Condition.Operator'
import classNames from 'classnames'

export const ConditionFieldOr = props => {
  const { className, 'data-cy': dataCy, ...rest } = props
  const componentClassName = classNames('c-ConditionOr'.className, className)

  return (
    <div
      {...getValidProps(rest)}
      className={componentClassName}
      data-cy="ConditionFieldOrWrapper"
    >
      <Operator data-cy={dataCy} type="or" isBorderless={true} />
    </div>
  )
}

ConditionFieldOr.defaultProps = {
  'data-cy': 'ConditionFieldOr',
}

ConditionFieldOr.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ConditionFieldOr
