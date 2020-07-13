import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FormGroupChoiceUI } from './FormGroup.css'

class FormGroupChoice extends React.PureComponent {
  render() {
    const {
      className,
      children,
      isResponsive,
      maxWidth,
      style,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-FormGroupChoice',
      isResponsive && 'is-responsive',
      className
    )

    const componentStyle = {
      maxWidth,
      ...style,
    }

    return (
      <FormGroupChoiceUI
        {...getValidProps(rest)}
        className={componentClassName}
        style={componentStyle}
      >
        {children}
      </FormGroupChoiceUI>
    )
  }
}

FormGroupChoice.defaultProps = {
  'data-cy': 'FormGroupChoice',
  isResponsive: false,
  style: {},
}

FormGroupChoice.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Max-width for the component. */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Enables responsive styling. */
  isResponsive: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default FormGroupChoice
