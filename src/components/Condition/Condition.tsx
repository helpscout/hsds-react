import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropProvider from '../PropProvider'
import propConnect from '../PropProvider/propConnect'
import { COMPONENT_KEY as FLEXY_COMPONENT_KEY } from '../Flexy/Flexy.utils'
import Select from '../Select'
import AddButton from './Condition.AddButton'
import Operator from './Condition.Operator'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ConditionProps } from './Condition.types'
import { COMPONENT_KEY } from './Condition.utils'
import {
  ConditionWrapperUI,
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

  static AddButton = AddButton
  static Operator = Operator

  getClassName() {
    const { className } = this.props
    return classNames(Condition.className, className)
  }

  getProviderProps() {
    return {
      [FLEXY_COMPONENT_KEY.Flexy]: {
        baseSize: 5,
      },
    }
  }

  render() {
    const { children, innerRef, options, value, ...rest } = this.props

    return (
      <ConditionWrapperUI className="c-ConditionWrapper">
        <PropProvider value={this.getProviderProps()}>
          <ConditionUI
            {...getValidProps(rest)}
            align="top"
            className={this.getClassName()}
            innerRef={innerRef}
          >
            <OptionsWrapperUI>
              <Select options={options} value={value} />
            </OptionsWrapperUI>
            <ContentWrapperUI>{children}</ContentWrapperUI>
          </ConditionUI>
        </PropProvider>
      </ConditionWrapperUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Condition)(Condition)

export default PropConnectedComponent
