import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ChoiceGroupContext from './ChoiceGroup.Context'
import FormGroup from '../FormGroup'
import FormLabelContext from '../FormLabel/Context'
import get from '../../utilities/get'
import classNames from 'classnames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { ChoiceGroupUI } from './ChoiceGroup.css'

const uniqueID = createUniqueIDFactory('ChoiceGroup')

class ChoiceGroup extends React.Component {
  constructor(props) {
    super(props)

    const selectedValue = this.getInitialSelectedValue(props)

    this.state = {
      id: uniqueID(),
      selectedValue,
      limitReached: this.getSelectLimitState(props, selectedValue),
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        selectedValue: this.getInitialSelectedValue(nextProps),
      })
    }
  }

  getInitialSelectedValue(props) {
    const { value, multiSelect, multiSelectLimit } = props
    let selectedValue = value ? [].concat(value) : []

    /** When multiSelect is not enabled and we get a value prop with more
     * than one item, take the first and ignore the rest
     */
    if (!multiSelect && selectedValue.length > 1) {
      selectedValue = selectedValue[0]
    }

    /** When multiselec is enabled and we have a limit, make sure
     * we return a selectedValue array with no more items than said limit
     */

    if (multiSelectLimit !== null && multiSelectLimit > 0) {
      selectedValue = selectedValue.slice(0, multiSelectLimit)
    }

    return selectedValue
  }

  getMultiSelectValue = (value, checked) => {
    const { selectedValue } = this.state
    const valueIndex = selectedValue.indexOf(value)

    if (valueIndex < 0 && checked) {
      return selectedValue.concat(value)
    }

    return selectedValue.filter(v => v !== value)
  }

  getSelectLimitState = (props, selectedValue) => {
    const { multiSelect, multiSelectLimit } = props

    return (
      multiSelect &&
      multiSelectLimit !== null &&
      multiSelectLimit > 0 &&
      selectedValue.length === multiSelectLimit
    )
  }

  handleOnChange = (value, checked) => {
    const { multiSelect, onChange } = this.props
    const selectedValue = multiSelect
      ? this.getMultiSelectValue(value, checked)
      : value
    const limitReached = this.getSelectLimitState(this.props, selectedValue)

    this.setState({ selectedValue, limitReached })
    onChange(selectedValue)
  }

  handleOnEnter = (value, checked) => {
    const { multiSelect, onEnter, onChange } = this.props
    const selectedValue = multiSelect
      ? this.getMultiSelectValue(value, checked)
      : value
    const limitReached = this.getSelectLimitState(this.props, selectedValue)

    this.setState({ selectedValue, limitReached })
    onEnter(selectedValue)
    onChange(selectedValue)
  }

  getContextProps = () => {
    const { onBlur, onFocus, name } = this.props
    const { selectedValue } = this.state

    return {
      onBlur,
      onChange: this.handleOnChange,
      onEnter: this.handleOnEnter,
      onFocus,
      name,
      selectedValue,
    }
  }

  getChildrenMarkup = () => {
    const { isResponsive, choiceMaxWidth, choiceHeight, children } = this.props
    const { id, selectedValue, limitReached } = this.state

    return (
      children &&
      React.Children.map(children, (child, index) => {
        const key = get(child, 'props.id') || `${id}-${index}`
        const isSelected = selectedValue.includes(child.props.value)
        const disabled =
          get(child, 'props.disabled') || (limitReached && !isSelected)
        const clone = React.isValidElement(child)
          ? React.cloneElement(child, {
              checked: isSelected,
              disabled,
              maxWidth: choiceMaxWidth,
              height: choiceHeight,
            })
          : child

        return (
          <FormGroup.Choice key={key} isResponsive={isResponsive}>
            {clone}
          </FormGroup.Choice>
        )
      })
    )
  }

  getIdFromContextProps = props => props.id || this.state.id

  render() {
    const {
      align,
      className,
      children,
      isResponsive,
      onBlur,
      onChange,
      onFocus,
      onEnter,
      multiSelect,
      name,
      ...rest
    } = this.props
    const { limitReached, selectedValue } = this.state
    const componentClassName = classNames(
      'c-ChoiceGroup',
      align && `is-align-${align}`,
      multiSelect && 'is-multi-select',
      isResponsive && 'is-responsive',
      limitReached && 'limit-reached',
      hasSelectedValue(selectedValue) && 'has-selected-value',
      className
    )
    const childrenMarkup = this.getChildrenMarkup()

    return (
      <FormLabelContext.Consumer>
        {props => (
          <ChoiceGroupContext.Provider value={this.getContextProps()}>
            <ChoiceGroupUI
              {...getValidProps(rest)}
              className={componentClassName}
              id={this.getIdFromContextProps(props)}
            >
              {childrenMarkup}
            </ChoiceGroupUI>
          </ChoiceGroupContext.Provider>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

function hasSelectedValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (value != null) {
    return true
  }
  return false
}

ChoiceGroup.defaultProps = {
  align: 'vertical',
  'data-cy': 'ChoiceGroup',
  isResponsive: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onEnter: noop,
  multiSelect: true,
}

ChoiceGroup.propTypes = {
  align: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Set the max-width for the child `Choice` components. */
  choiceMaxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Disable the input. */
  disabled: PropTypes.bool,
  /** Enables responsive styling. */
  isResponsive: PropTypes.bool,
  /** Allow multiple choice selection */
  multiSelect: PropTypes.bool,
  /** Limit of selections allowed when multiSelect enabled */
  multiSelectLimit: PropTypes.number,
  /** Name for the inputs. */
  name: PropTypes.string,
  /** Callback when an input is blurred. */
  onBlur: PropTypes.func,
  /** Callback when an input value is changed. */
  onChange: PropTypes.func,
  /** Callback when an input is focused. */
  onFocus: PropTypes.func,
  /** Callback when an enter or espace is pressed. */
  onEnter: PropTypes.func,
  /** The default value of input group. */
  value: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ChoiceGroup
