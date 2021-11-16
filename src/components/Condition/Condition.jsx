import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import { FlexyContext } from '../Flexy/Flexy'
import And from './Condition.And'
import AddButton from './Condition.AddButton'
import Operator from './Condition.Operator'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import DropList from '../DropList/DropList'
import { SelectTag } from '../DropList/DropList.togglers'

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

  getSelectedItem(options, value) {
    return options.find(option => option.value === value)
  }

  handleConditionSelect = selection => {
    return selection && this.props.onChange(selection.value)
  }

  render() {
    const {
      children,
      innerRef,
      options,
      onChange,
      value,
      noSelect,
      ariaDescribedBy,
      ...rest
    } = this.props

    const selectedItem = this.getSelectedItem(options, value)
    const baseSelectLabel = 'conditions toggle menu'
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
                <DropList
                  onSelect={this.handleConditionSelect}
                  items={options}
                  selection={selectedItem}
                  toggler={
                    <SelectTag
                      a11yLabel={
                        selectedItem
                          ? `${baseSelectLabel}, ${selectedItem.label} currently selected`
                          : baseSelectLabel
                      }
                      aria-describedby={ariaDescribedBy}
                    />
                  }
                />
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
  /** Collection of condition values, rendered by a [DropList](../DropList). */
  options: PropTypes.arrayOf(PropTypes.any),
  /** Callback when the `option` [DropList](../DropList) has changed. */
  onChange: PropTypes.func,
  /** The value of the condition ([DropList](../DropList)). */
  value: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Flag indicating if should not render Select component */
  noSelect: PropTypes.bool,
  /** ID of element used for aria-describedby attribute */
  ariaDescribedBy: PropTypes.string,
}

export default Condition
