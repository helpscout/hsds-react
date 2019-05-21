import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import IconButton from '../IconButton'
import Static from './ConditionField.Static'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ConditionFieldProps } from './ConditionField.types'
import { COMPONENT_KEY } from './ConditionField.utils'
import {
  FieldUI,
  FieldContentWrapperUI,
  FieldCloseWrapperUI,
} from './styles/ConditionField.css'

export class ConditionField extends React.PureComponent<ConditionFieldProps> {
  static className = 'c-ConditionField'
  static defaultProps = {
    closeIcon: 'collapse',
    innerRef: noop,
    options: [],
  }

  static Static = Static

  getClassName() {
    const { className } = this.props
    return classNames(ConditionField.className, className)
  }

  render() {
    const { children, closeIcon, innerRef, ...rest } = this.props

    return (
      <FieldUI {...getValidProps(rest)}>
        <FieldContentWrapperUI>{children}</FieldContentWrapperUI>
        <FieldCloseWrapperUI>
          <IconButton icon={closeIcon} />
        </FieldCloseWrapperUI>
      </FieldUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Field)(ConditionField)

export default PropConnectedComponent
