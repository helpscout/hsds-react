import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import { FlexyContext } from '../Flexy/Flexy'
import Select from '../Select'
import And from './Condition.And'
import AddButton from './Condition.AddButton'
import Operator from './Condition.Operator'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

import {
  ConditionUI,
  ConditionContentUI,
  OptionsWrapperUI,
} from './Condition.css'

export class Condition extends React.PureComponent {
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
      baseSize: 5,
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
        ref={innerRef}
      >
        {this.renderOperator()}
        <FlexyContext.Provider value={this.getProviderProps()}>
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
        </FlexyContext.Provider>
      </ConditionUI>
    )
  }
}

Condition.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  isWithAnd: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func,
  value: PropTypes.string,
}

Condition.defaultProps = {
  'data-cy': 'Condition',
  innerRef: noop,
  isWithAnd: false,
  onChange: noop,
  options: [],
}

export default Condition
