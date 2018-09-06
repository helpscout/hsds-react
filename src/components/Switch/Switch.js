// @flow
import { SwitchSize, SwitchState, SwitchValue } from './types'
import React, { PureComponent as Component } from 'react'
import { getValidProps } from '@helpscout/react-utils'
import FormLabelContext from '../FormLabel/Context'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import {
  WrapperUI,
  SwitchUI,
  InputUI,
  StateUI,
  BackdropUI,
  ToggleUI,
} from './styles/Switch.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  checked: boolean,
  id: string,
  isLoading: boolean,
  inputRef: (ref: any) => void,
  name: string,
  onBlur: (event: Event) => void,
  onChange: (value: SwitchValue) => void,
  onFocus: (event: Event) => void,
  onMouseDown: (event: Event) => void,
  onMouseUp: (event: Event) => void,
  labelOn: string,
  labelOff: string,
  size: SwitchSize,
  state: SwitchState,
  value: SwitchValue,
}

type State = {
  checked: ?boolean,
  id: string,
  isActive: boolean,
  isFocused: boolean,
}

const uniqueID = createUniqueIDFactory('Switch')

class Switch extends Component<Props, State> {
  static defaultProps = {
    inputRef: noop,
    isLoading: false,
    labelOn: 'On',
    labelOff: 'Off',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onMouseDown: noop,
    onMouseUp: noop,
    size: 'md',
    value: '',
  }

  shouldAutoUpdateChecked: boolean

  constructor(props: Props) {
    super(props)
    this.state = {
      checked: props.checked || false,
      isActive: false,
      isFocused: false,
      id: props.id || uniqueID(),
    }
    this.shouldAutoUpdateChecked = props.checked === undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    /* istanbul ignore else */
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked,
      })
    }
  }

  handleOnChange = (event: Event) => {
    const { onChange, value } = this.props

    /* istanbul ignore else */
    if (this.shouldAutoUpdateChecked) {
      this.setState({ checked: !this.state.checked })
    }

    onChange(value)
  }

  handleOnBlur = (event: Event) => {
    this.setState({ isFocused: false })
    this.props.onBlur(event)
  }

  handleOnFocus = (event: Event) => {
    this.setState({ isFocused: true })
    this.props.onFocus(event)
  }

  handleOnMouseDown = (event: Event) => {
    this.setState({
      isActive: true,
    })
    this.props.onMouseDown(event)
  }

  handleOnMouseUp = (event: Event) => {
    this.setState({
      isActive: false,
    })
    this.props.onMouseUp(event)
  }

  getIdFromContextProps = (props: Object = {}) => {
    return props.id || this.state.id
  }

  getInputMarkup = (props: Object = {}) => {
    const { checked: propActive, inputRef, name, value, ...rest } = this.props
    const { checked } = this.state

    const id = this.getIdFromContextProps(props)

    return (
      <InputUI
        {...getValidProps(rest)}
        aria-checked={checked}
        className="c-Switch__input"
        checked={checked}
        id={id}
        name={name}
        onBlur={this.handleOnBlur}
        onChange={this.handleOnChange}
        onFocus={this.handleOnFocus}
        ref={inputRef}
        role="switch"
        type="checkbox"
        value={value}
      />
    )
  }

  render() {
    const {
      className,
      onBlur,
      onChange,
      onFocus,
      id,
      isLoading,
      labelOn,
      labelOff,
      size,
      state,
      value,
      ...rest
    } = this.props

    const { checked, isActive, isFocused } = this.state

    const shouldShowChecked = !isLoading && checked
    const shouldShowActive = !isLoading && isActive

    const componentClassName = classNames(
      'c-Switch',
      shouldShowChecked && 'is-checked',
      isLoading && 'is-loading',
      size && `is-${size}`,
      state && `is-${state}`,
      className
    )

    const backdropClassName = classNames(
      'c-Switch__backdrop',
      shouldShowChecked && 'is-checked',
      isFocused && 'is-focused',
      size && `is-${size}`
    )

    const toggleClassName = classNames(
      'c-Switch__toggle',
      shouldShowChecked && 'is-checked',
      shouldShowActive && 'is-active',
      isFocused && 'is-focused',
      isLoading && 'is-loading',
      size && `is-${size}`
    )

    const stateMarkup = state && <StateUI className="c-Switch__state" />
    const switchLabel = checked ? labelOn : labelOff

    return (
      <FormLabelContext.Consumer>
        {(props: Object) => (
          <WrapperUI className="c-SwitchWrapper">
            <SwitchUI
              {...getValidProps(rest)}
              className={componentClassName}
              htmlFor={this.getIdFromContextProps(props)}
              onMouseDown={this.handleOnMouseDown}
              onMouseUp={this.handleOnMouseUp}
            >
              {this.getInputMarkup(props)}
              <BackdropUI className={backdropClassName}>
                <ToggleUI className={toggleClassName} />
              </BackdropUI>
              {stateMarkup}
              <VisuallyHidden>{switchLabel}</VisuallyHidden>
            </SwitchUI>
          </WrapperUI>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Switch)

export default Switch
