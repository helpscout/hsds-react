import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Operator from '../Condition/Condition.Operator'
import { classNames } from '../../utilities/classNames'

export const ConditionFieldAnd = props => {
  const { className, 'data-cy': dataCy, ...rest } = props
  const componentClassName = classNames('c-ConditionAnd'.className, className)

  return (
    <div
      {...getValidProps(rest)}
      className={componentClassName}
      data-cy="ConditionFieldAndWrapper"
    >
      <Operator data-cy={dataCy} type="and" isBorderless={true} />
    </div>
  )
}

ConditionFieldAnd.defaultProps = {
  'data-cy': 'ConditionFieldAnd',
}

ConditionFieldAnd.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ConditionFieldAnd
