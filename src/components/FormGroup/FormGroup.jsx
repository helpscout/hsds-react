import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import Choice from './FromGroup.Choice'
import Grid from './FromGroup.Grid'

import { FormGroupUI } from './FormGroup.css'

class FormGroup extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }
  static Choice = Choice
  static Grid = Grid

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

export default FormGroup
