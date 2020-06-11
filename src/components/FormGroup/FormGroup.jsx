import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
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

FormGroup.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

FormGroup.defaultProps = {
  'data-cy': 'FormGroup',
}

export default FormGroup
