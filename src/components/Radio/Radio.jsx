import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'

export const RadioContext = React.createContext({})

export const Radio = ({ kind: kindProp, className, ...rest }) => {
  const componentClassName = classNames('c-Radio', className)
  const { kind = kindProp, stacked } = React.useContext(RadioContext)

  return (
    <Choice
      {...getValidProps(rest)}
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
