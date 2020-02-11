import React from 'react'
import PropTypes from 'prop-types'
import Choice from '../Choice'
import { classNames } from '../../utilities/classNames'

export const RadioContext = React.createContext({})

export const Radio = ({ kind: kindProp, className, ...rest }) => {
  const componentClassName = classNames('c-Radio', className)
  const { kind = kindProp, stacked } = React.useContext(RadioContext)

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

Radio.defaultProps = {
  kind: 'default',
}

Radio.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.oneOf(['default', 'custom']),
}

export default Radio
