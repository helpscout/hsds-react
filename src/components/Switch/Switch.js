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
  SwitchWrapperUI,
  SwitchUI,
  SwitchInputUI,
  SwitchStateUI,
  SwitchToggleUI,
} from './styles/Switch.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  checked: boolean,
  id: string,
  inputRef: (ref: any) => void,
  name: string,
  onBlur: (event: Event) => void,
  onChange: (event: Event) => void,
  onFocus: (event: Event) => void,
  labelOn: string,
  labelOff: string,
  size: SwitchSize,
  state: SwitchState,
  value: SwitchValue,
}

type State = {
  checked: boolean,
  id: string,
  isFocused: boolean,
}

const uniqueID = createUniqueIDFactory('Switch')

class Switch extends Component<Props, State> {
  static defaultProps = {
    checked: false,
    inputRef: noop,
    labelOn: 'On',
    labelOff: 'Off',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    value: '',
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      checked: props.checked,
      isFocused: false,
      id: props.id || uniqueID(),
    }
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
    this.setState({ checked: !this.state.checked })
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

  getIdFromContextProps = (props: Object = {}) => {
    return props.id || this.state.id
  }

  getInputMarkup = (props: Object = {}) => {
    const { checked: propActive, inputRef, name, value, ...rest } = this.props

    const { checked } = this.state

    const id = this.getIdFromContextProps(props)

    return (
      <SwitchInputUI
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
      labelOn,
      labelOff,
      size,
      state,
      value,
      ...rest
    } = this.props

    const { checked, isFocused } = this.state

    const componentClassName = classNames(
      'c-Switch',
      checked && 'is-checked',
      size && `is-${size}`,
      state && `is-${state}`,
      className
    )

    const toggleClassName = classNames(
      'c-Switch__toggle',
      checked && 'is-checked',
      isFocused && 'is-focused',
      size && `is-${size}`
    )

    const stateMarkup = state && <SwitchStateUI className="c-Switch__state" />
    const switchLabel = checked ? labelOn : labelOff

    return (
      <FormLabelContext.Consumer>
        {(props: Object) => (
          <SwitchWrapperUI className="c-SwitchWrapper">
            <SwitchUI
              {...getValidProps(rest)}
              className={componentClassName}
              htmlFor={this.getIdFromContextProps(props)}
            >
              {this.getInputMarkup(props)}
              <SwitchToggleUI className={toggleClassName} />
              {stateMarkup}
              <VisuallyHidden>{switchLabel}</VisuallyHidden>
            </SwitchUI>
          </SwitchWrapperUI>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Switch)

export default Switch
