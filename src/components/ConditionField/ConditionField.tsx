import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Flexy from '../Flexy'
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
    onRemove: noop,
  }

  static Static = Static
  static Block = Flexy.Block
  static Item = Flexy.Item

  getClassName() {
    const { className } = this.props
    return classNames(ConditionField.className, className)
  }

  render() {
    const { children, closeIcon, innerRef, onRemove, ...rest } = this.props

    return (
      <FieldUI {...getValidProps(rest)}>
        <FieldContentWrapperUI>
          <Flexy align="top" gap="md">
            {children}
          </Flexy>
        </FieldContentWrapperUI>
        <FieldCloseWrapperUI>
          <IconButton icon={closeIcon} onClick={onRemove} />
        </FieldCloseWrapperUI>
      </FieldUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Field)(ConditionField)

export default PropConnectedComponent
