import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Operator from './Condition.Operator'
import classNames from 'classnames'
import { AndWrapperUI } from './Condition.css'

export const And = props => {
  const { className, 'data-cy': dataCy, ...rest } = props
  const componentClassName = classNames('c-ConditionAnd', className)

  return (
    <AndWrapperUI
      {...getValidProps(rest)}
      className={componentClassName}
      data-cy="ConditionAndWrapper"
    >
      <Operator data-cy={dataCy} type="and" isBorderless={false} />
    </AndWrapperUI>
  )
}

And.defaultProps = {
  'data-cy': 'ConditionAnd',
}

And.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default And
