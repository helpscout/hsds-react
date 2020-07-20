import React from 'react'
import PropTypes from 'prop-types'
import SearchableDropdown from '../SearchableDropdown'
import Icon from '../Icon'
import Text from '../Text'
import SelectArrows from '../Select/Select.Arrows'
import Tooltip from '../Tooltip'
import { initialState } from '../Dropdown/Dropdown.store'
import { itemIsActive } from '../Dropdown/Dropdown.utils'
import { find } from '../../utilities/arrays'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  SelectDropdownUI,
  InputUI,
  LabelUI,
  BackdropUI,
  ErrorUI,
} from './SelectDropdown.css'
import { isObject } from '../../utilities/is'
import Dropdown from '../Dropdown'

export class SelectDropdown extends React.PureComponent {
  state = {
    isFocused: this.props.isFocused,
    selectedItem:
      this.props.selectedItem ||
      this.getSelectedItem(this.props.items, this.props.value) ||
      this.props.items[0],
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedItem !== this.props.selectedItem) {
      this.setState({
        selectedItem: this.getSelectedItem(
          nextProps.items,
          nextProps.selectedItem
        ),
      })
    }
    if (nextProps.value !== this.props.value) {
      this.setState({
        selectedItem: this.getSelectedItem(nextProps.items, nextProps.value),
      })
    }
  }

  handleOnBlur = event => {
    this.setState({
      isFocused: false,
    })
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
    this.setState({
      isFocused: true,
    })
    this.props.onFocus(event)
  }

  handleOnChange = (value, props) => {
    this.props.onChange(value, props)
    this.props.onSelect(value, props)

    this.setState({
      selectedItem: props.item,
    })
  }

  getClassName() {
    const { className } = this.props

    return classNames('c-SelectDropdown', className)
  }

  getActiveItem() {
    return this.props.items.filter(item =>
      itemIsActive(this.state.selectedItem, item)
    )[0]
  }

  getLabel() {
    const { trigger, placeholder } = this.props
    const { selectedItem } = this.state
    const activeItem = this.getActiveItem()
    const targetItem = selectedItem || activeItem

    if (targetItem) {
      return targetItem.label || targetItem.value
    }

    return trigger || placeholder
  }

  getSelectedItem(items, value) {
    if (isObject(value)) return value

    return find(items, item => {
      if (isObject(item)) {
        return item.value === value
      }
      return item === value
    })
  }

  getTriggerStyle() {
    return {
      textDecoration: 'none',
    }
  }

  renderError() {
    const { errorIcon, errorMessage, state } = this.props
    const shouldRenderError = state === 'error'

    if (!shouldRenderError) return null

    return (
      <ErrorUI className="c-SelectDropdownError">
        <Tooltip display="block" placement="top-end" title={errorMessage}>
          <Icon
            aria-hidden
            name={errorIcon}
            state={'error'}
            className="c-Select__errorIcon"
          />
        </Tooltip>
      </ErrorUI>
    )
  }

  renderTrigger() {
    const { disabled, state } = this.props
    const { isFocused } = this.state
    const isError = state === 'error'

    return (
      <InputUI
        className={classNames('c-SelectDropdownTrigger', isError && 'is-error')}
      >
        <LabelUI className="c-SelectDropdownTriggerLabel" disabled={disabled}>
          <Text truncate>{this.getLabel()}</Text>
        </LabelUI>
        <SelectArrows state={state} disabled={disabled} />
        {this.renderError()}
        <BackdropUI isFocused={isFocused} state={state} />
      </InputUI>
    )
  }

  render() {
    const { 'data-cy': dataCy, ...rest } = this.props

    return (
      <SelectDropdownUI className="c-SelectDropdownWrapper" data-cy={dataCy}>
        <SearchableDropdown
          {...rest}
          className={this.getClassName()}
          renderTrigger={this.renderTrigger()}
          selectedItem={this.state.selectedItem}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
          onSelect={this.handleOnChange}
          triggerStyle={this.getTriggerStyle()}
        />
      </SelectDropdownUI>
    )
  }
}

SelectDropdown.defaultProps = {
  ...initialState,
  clearOnSelect: false,
  'data-cy': 'SelectDropdown',
  errorIcon: 'alert',
  items: [],
  limit: 15,
  autoInput: true,
  isFocused: false,
  isFocusSelectedItemOnOpen: true,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  placeholder: 'Select',
  maxWidth: '100%',
  menuOffsetTop: 3,
  state: 'default',
  trigger: undefined,
  width: '100%',
  value: undefined,
}

SelectDropdown.propTypes = {
  ...Dropdown.propTypes,
  ...{
    /** Renders the search `Input` based on the limit and the number of items. */
    autoInput: PropTypes.bool,
    /** Data attr for Cypress tests. */
    'data-cy': PropTypes.string,
    /** `Icon` to render for an `error` state. */
    errorIcon: PropTypes.string,
    /** Message to display (in a `Tooltip`) for an `error` state. */
    errorMessage: PropTypes.string,
    /** Renders the focus UI. */
    isFocused: PropTypes.bool,
    /** Max number of items before the search input is displayed */
    limit: PropTypes.number,
    /** Callback when an item is selected. */
    onChange: PropTypes.func,
    /** Placeholder text if there are no selected items. */
    placeholder: PropTypes.string,
    /** State to render for the component. */
    state: PropTypes.oneOf([
      'default',
      'error',
      'success',
      'warning',
      '',
      null,
    ]),
    /** The selected value. */
    value: PropTypes.any,
  },
}

export default SelectDropdown
