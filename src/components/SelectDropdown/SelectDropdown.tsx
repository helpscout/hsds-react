import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import AutoDropdown from '../AutoDropdown'
import Icon from '../Icon'
import Text from '../Text'
import SelectArrows from '../Select/Select.Arrows'
import Tooltip from '../Tooltip'
import { initialState } from '../Dropdown/V2/Dropdown.store'
import { itemIsActive } from '../Dropdown/V2/Dropdown.utils'
import { COMPONENT_KEY } from './SelectDropdown.utils'
import { find } from '../../utilities/arrays'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  BackdropUI,
  ErrorUI,
  InputUI,
  LabelUI,
  SelectArrowDownUI,
  SelectDropdownUI,
} from './styles/SelectDropdown.css'

import { FocusIndicatorUI } from '../EditableField/styles/EditableField.css'

import { isObject } from '../../utilities/is'
import {
  SelectDropdownProps,
  SelectDropdownState,
} from './SelectDropdown.types'

export class SelectDropdown extends React.PureComponent<
  SelectDropdownProps,
  SelectDropdownState
> {
  static defaultProps = {
    ...initialState,
    clearOnSelect: false,
    errorIcon: 'alert',
    items: [],
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
    fieldStyle: undefined,
  }

  state = {
    isFocused: this.props.isFocused,
    selectedItem:
      this.props.selectedItem ||
      this.getSelectedItem(this.props.items, this.props.value) ||
      this.props.items[0],
  }

  componentWillReceiveProps(nextProps) {
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

  getSelectedItem(items: Array<any>, value: any): any {
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
    const { state, fieldStyle } = this.props
    const { isFocused } = this.state
    const isError = state === 'error'

    return (
      <InputUI
        className={classNames(
          'c-SelectDropdownTrigger',
          isError && 'is-error',
          fieldStyle === 'editableField' && 'is-editableField'
        )}
      >
        <LabelUI className="c-SelectDropdownTriggerLabel">
          <Text truncate>{this.getLabel()}</Text>
        </LabelUI>

        {fieldStyle !== 'editableField' ? (
          <SelectArrows state={state} />
        ) : (
          <SelectArrowDownUI>
            <Icon name="chevron-down" />
          </SelectArrowDownUI>
        )}

        {this.renderError()}

        {fieldStyle !== 'editableField' ? (
          <BackdropUI isFocused={isFocused} state={state} />
        ) : (
          <FocusIndicatorUI
            className={classNames(
              'c-SelectDropdownFocusIndicator',
              isFocused && 'is-focused'
            )}
          />
        )}
      </InputUI>
    )
  }

  render() {
    return (
      <SelectDropdownUI
        className="c-SelectDropdownWrapper"
        data-cy="SelectDropdown"
      >
        <AutoDropdown
          {...this.props}
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

const PropConnectedComponent = propConnect(COMPONENT_KEY)(SelectDropdown)

export default PropConnectedComponent
