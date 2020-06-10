import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import GridComponent from '../Grid'
import { classNames } from '../../utilities/classNames'

class FormGroupGrid extends React.PureComponent {
  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-FormGroupGrid', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        <GridComponent>{children}</GridComponent>
      </div>
    )
  }
}

FormGroupGrid.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

FormGroupGrid.defaultProps = {
  'data-cy': 'FormGroupGrid',
}

export default FormGroupGrid
