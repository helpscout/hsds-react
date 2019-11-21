import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropProvider from '../PropProvider'
import propConnect from '../PropProvider/propConnect'
import Flexy from '../Flexy'
import { COMPONENT_KEY as FLEXY_COMPONENT_KEY } from '../Flexy/Flexy.utils'
import Select from '../Select'
import And from './Condition.And'
import AddButton from './Condition.AddButton'
import Operator from './Condition.Operator'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ConditionProps } from './Condition.types'
import { COMPONENT_KEY } from './Condition.utils'
import {
  ConditionUI,
  ConditionContentUI,
  OptionsWrapperUI,
} from './styles/Condition.css'

export class Condition extends React.PureComponent<ConditionProps> {
  static defaultProps = {
    innerRef: noop,
    isWithAnd: false,
    onChange: noop,
    options: [],
  }

  static className = 'c-Condition'

  static AddButton = AddButton
  static And = And
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

  renderOperator() {
    const { isWithAnd } = this.props
    if (!isWithAnd) return null

    return <And />
  }

  render() {
    const { children, innerRef, options, onChange, value, ...rest } = this.props

    return (
      <ConditionUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef as any}
      >
        {this.renderOperator()}
        <PropProvider value={this.getProviderProps()}>
          <ConditionContentUI
            align="top"
            className="c-ConditionContent"
            data-cy="ConditionContent"
          >
            <OptionsWrapperUI data-cy="ConditionSelectWrapper">
              <Select onChange={onChange} options={options} value={value} />
            </OptionsWrapperUI>
            <Flexy.Block data-cy="ConditionInnerContentWrapper">
              {children}
            </Flexy.Block>
          </ConditionContentUI>
        </PropProvider>
      </ConditionUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Condition)(Condition)

export default PropConnectedComponent
