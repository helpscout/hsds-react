// @flow
import { SwitchSize, SwitchState, SwitchValue } from './types'
import React, { PureComponent as Component } from 'react'
import { getValidProps } from '@helpscout/react-utils'
import FormLabelContext from '../FormLabel/Context'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import {
  SwitchWrapperUI,
  SwitchUI,
  SwitchInputUI,
  SwitchStateUI,
  SwitchToggleUI,
} from './styles/Switch.css.js'

type Props = {
  active: boolean,
  className?: string,
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
  active: boolean,
  id: string,
  isFocused: boolean,
}

const uniqueID = createUniqueIDFactory('Switch')

class Switch extends Component<Props, State> {
  static defaultProps = {
    active: false,
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
      active: props.active,
      isFocused: false,
      id: props.id || uniqueID(),
    }
  }

  handleOnChange = (event: Event) => {
    const { onChange, value } = this.props
    this.setState({ active: !this.state.active })
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
    const { active: propActive, inputRef, name, value, ...rest } = this.props

    const { active, isFocused } = this.state

    const id = this.getIdFromContextProps(props)

    return (
      <SwitchInputUI
        {...getValidProps(rest)}
        aria-checked={active}
        className="c-Switch__input"
        checked={active}
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
      labelOn,
      labelOff,
      size,
      state,
      value,
      ...rest
    } = this.props

    const { active, isFocused } = this.state

    const componentClassName = classNames(
      'c-Switch',
      active && 'is-active',
      size && `is-${size}`,
      state && `is-${state}`,
      className
    )

    const toggleClassName = classNames(
      'c-Switch__toggle',
      active && 'is-active',
      isFocused && 'is-focused',
      size && `is-${size}`
    )

    const stateMarkup = state && <SwitchStateUI className="c-Switch__state" />
    const switchLabel = active ? labelOn : labelOff

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

export default Switch
