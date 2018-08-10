// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'
import { FormGroupUI } from './styles/FormGroup.css.js'

type Props = {
  children?: any,
  className?: string,
}

class FormGroup extends Component<Props> {
  static Choice: any
  static Grid: any

  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-FormGroup', className)

    return (
      <FormGroupUI className={componentClassName} {...rest}>
        {children}
      </FormGroupUI>
    )
  }
}

export default FormGroup
