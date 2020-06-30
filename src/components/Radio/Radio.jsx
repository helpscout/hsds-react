import React from 'react'
import PropTypes from 'prop-types'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'

export const RadioContext = React.createContext({})

export const Radio = ({
  kind: kindProp,
  stacked: stackedProp,
  className,
  ...rest
}) => {
  const componentClassName = classNames('c-Radio', className)
  const { kind = kindProp, stacked = stackedProp } = React.useContext(
    RadioContext
  )

  return (
    <Choice
      {...rest}
      className={componentClassName}
      componentID="Radio"
      kind={kind}
      type="radio"
      stacked={stacked}
    />
  )
}

Radio.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  kind: PropTypes.oneOf(['default', 'custom']),
}

Radio.defaultProps = {
  'data-cy': 'Radio',
  kind: 'default',
}

export default Radio
