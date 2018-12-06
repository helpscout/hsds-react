import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import AutoDropdown from '../AutoDropdown'
import Icon from '../Icon'
import Text from '../Text'
import SelectArrows from '../Select/Select.Arrows'
import Tooltip from '../Tooltip'
import { initialState } from '../Dropdown/V2/Dropdown.store'
import { DropdownProps } from '../Dropdown/V2/Dropdown.types'
import { itemIsActive } from '../Dropdown/V2/Dropdown.utils'
import { COMPONENT_KEY } from './SelectDropdown.utils'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  SelectDropdownUI,
  InputUI,
  LabelUI,
  BackdropUI,
  ErrorUI,
} from './SelectDropdown.css'

export interface Props extends DropdownProps {
  onChange: (...args: any) => void
  errorIcon: string
  errorMessage?: string
  isFocused: boolean
  placeholder: string
  state: string
  triggerLabel: string
}
export interface State {
  isFocused: boolean
  selectedItem: any
}

export class SelectDropdown extends React.PureComponent<Props, State> {
  static defaultProps = {
    ...initialState,
    errorIcon: 'alert',
    items: [],
    isFocused: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    placeholder: 'Select',
    maxWidth: '100%',
    menuOffsetTop: 3,
    state: 'default',
    triggerLabel: 'Select',
    width: '100%',
  }

  state = {
    isFocused: this.props.isFocused,
    selectedItem: this.props.selectedItem || this.props.items[0],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedItem !== this.state.selectedItem) {
      this.setState({
        selectedItem: nextProps.selectedItem,
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

  getActiveItem() {
    return this.props.items.filter(item =>
      itemIsActive(this.state.selectedItem, item)
    )[0]
  }

  getLabel() {
    const { triggerLabel, placeholder } = this.props
    const { selectedItem } = this.state
    const activeItem = this.getActiveItem()
    const targetItem = selectedItem || activeItem

    if (targetItem) {
      return targetItem.label || targetItem.value
    }

    if (triggerLabel) return triggerLabel

    return placeholder
  }

  renderError() {
    const { errorIcon, errorMessage, state } = this.props
    const shouldRenderError = state === 'error'

    if (!shouldRenderError) return null

    return (
      <ErrorUI>
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
    const { state } = this.props
    const { isFocused } = this.state
    const isError = state === 'error'

    return (
      <InputUI className={classNames(isError && 'is-error')}>
        <LabelUI>
          <Text truncate>{this.getLabel()}</Text>
        </LabelUI>
        <SelectArrows state={state} />
        {this.renderError()}
        <BackdropUI isFocused={isFocused} state={state} />
      </InputUI>
    )
  }

  render() {
    return (
      <SelectDropdownUI className="c-SelectDropdownWrapper">
        <AutoDropdown
          {...this.props}
          clearOnSelect={false}
          renderTrigger={this.renderTrigger()}
          selectedItem={this.state.selectedItem}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
          onSelect={this.handleOnChange}
        />
      </SelectDropdownUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(SelectDropdown)

export default PropConnectedComponent
