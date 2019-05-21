import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Select from '../Select'
import Operator from './Condition.Operator'
import { classNames } from '../../utilities/classNames'
import { isObject } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { ConditionProps } from './Condition.types'
import { COMPONENT_KEY } from './Condition.utils'
import {
  ConditionUI,
  OptionsWrapperUI,
  ContentWrapperUI,
} from './styles/Condition.css'

export class Condition extends React.PureComponent<ConditionProps> {
  static className = 'c-Condition'
  static defaultProps = {
    innerRef: noop,
    isMultiCondition: false,
    options: [],
  }

  static Operator = Operator

  getClassName() {
    const { className } = this.props
    return classNames(Condition.className, className)
  }

  getSelectedValue() {
    const { selectedItem } = this.props

    return isObject(selectedItem) ? selectedItem.value : selectedItem
  }

  render() {
    const { children, innerRef, options, selectedItem, ...rest } = this.props

    return (
      <ConditionUI
        {...getValidProps(rest)}
        align="top"
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <OptionsWrapperUI>
          <Select options={options} value={this.getSelectedValue()} />
        </OptionsWrapperUI>
        <ContentWrapperUI>{children}</ContentWrapperUI>
      </ConditionUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Condition)(Condition)

export default PropConnectedComponent
