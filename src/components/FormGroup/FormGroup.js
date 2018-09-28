// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { FormGroupUI } from './styles/FormGroup.css.js'
import { COMPONENT_KEY } from './utils'

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
      <FormGroupUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </FormGroupUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.FormGroup)(FormGroup)

export default FormGroup
