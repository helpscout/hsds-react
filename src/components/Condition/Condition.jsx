import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import { FlexyContext } from '../Flexy/Flexy'
import Select from '../Select'
import And from './Condition.And'
import AddButton from './Condition.AddButton'
import Operator from './Condition.Operator'
import classNames from 'classnames'
import { noop } from '../../utilities/other'

import {
  ConditionContentUI,
  ConditionUI,
  OptionsWrapperUI,
  SelectedOptionUI,
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

  getSelectedLabel = (options, value) => {
    const foundOption = options.find(option => option.value === value)
    return foundOption && foundOption.label
  }

  render() {
    const {
      children,
      innerRef,
      options,
      onChange,
      value,
      noSelect,
      ...rest
    } = this.props

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
              {noSelect ? (
                <SelectedOptionUI>
                  {this.getSelectedLabel(options, value)}
                </SelectedOptionUI>
              ) : (
                <Select onChange={onChange} options={options} value={value} />
              )}
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

Condition.defaultProps = {
  'data-cy': 'Condition',
  innerRef: noop,
  isWithAnd: false,
  onChange: noop,
  options: [],
  noSelect: false,
}

Condition.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Renders the "And" operator (top). */
  isWithAnd: PropTypes.bool,
  /** Collection of condition values, rendered by a [Select](../Select). */
  options: PropTypes.arrayOf(PropTypes.any),
  /** Callback when the `option` [Select](../Select) has changed. */
  onChange: PropTypes.func,
  /** The value of the condition ([Select](../Select)). */
  value: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Flag indicating if should not render Select component */
  noSelect: PropTypes.bool,
}

export default Condition
