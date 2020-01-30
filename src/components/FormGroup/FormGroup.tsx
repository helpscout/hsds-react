import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import Choice from './FromGroup.Choice'
import Grid from './FromGroup.Grid'

import { FormGroupUI } from './FormGroup.css'

type Props = {
  children?: any
  className?: string
}

class FormGroup extends React.PureComponent<Props> {
  static Choice: any = Choice
  static Grid: any = Grid

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
