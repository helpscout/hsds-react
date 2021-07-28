import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import FormGroupChoice from './FromGroup.Choice'
import FormGroupGrid from './FromGroup.Grid'
import { FormGroupUI } from './FormGroup.css'

class FormGroup extends React.PureComponent {
  static Choice = FormGroupChoice
  static Grid = FormGroupGrid

  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-FormGroup', className)

    return (
      <FormGroupUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </FormGroupUI>
    )
  }
}

FormGroup.defaultProps = {
  'data-cy': 'FormGroup',
}

FormGroup.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default FormGroup
