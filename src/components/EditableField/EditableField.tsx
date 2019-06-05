import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { EditableFieldProps } from './EditableField.types'
import { EditableFieldUI } from './styles/EditableField.css'
import { COMPONENT_KEY } from './EditableField.utils'

export class EditableField extends React.PureComponent<EditableFieldProps> {
  static className = 'c-EditableField'
  static defaultProps = {
    innerRef: noop,
  }

  getClassName() {
    const { className } = this.props
    return classNames(EditableField.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <EditableFieldUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        {children}
      </EditableFieldUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableField)

export default PropConnectedComponent
