import { SwitchSize, SwitchState, SwitchValue } from './types'
import { FormLabelContextProps } from '../FormLabel/FormLabel.types'
import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import FormLabelContext from '../FormLabel/Context'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames'
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

export interface Props {
  className?: string
  checked: boolean
  disabled: boolean
  id: string
  isLoading: boolean
  inputRef: (ref: any) => void
  innerRef: (ref: any) => void
  name: string
  onBlur: (event: Event) => void
  onChange: (state: boolean, { event: Event, value: SwitchValue }) => void
  onClick: (event: Event) => void
  onFocus: (event: Event) => void
  onMouseDown: (event: Event) => void
  onMouseUp: (event: Event) => void
  labelOn: string
  labelOff: string
  size: SwitchSize
  state: SwitchState
  value: SwitchValue
}

export interface State {
  checked?: boolean
  id: string
  isActive: boolean
  isFocused: boolean
}

const uniqueID = createUniqueIDFactory('Switch')

class Switch extends React.PureComponent<Props, State> {
  static defaultProps = {
    inputRef: noop,
    innerRef: noop,
    isLoading: false,
    labelOn: 'On',
    labelOff: 'Off',
    onBlur: noop,
    onChange: noop,
    onClick: noop,
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
    const nextChecked = !this.state.checked

    /* istanbul ignore else */
    if (this.shouldAutoUpdateChecked) {
      this.setState({ checked: nextChecked })
    }

    onChange(nextChecked, { event, value })
  }

  handleOnClick = (event: Event) => {
    event.stopPropagation()
    if (this.props.isLoading) {
      event.preventDefault()
    } else {
      this.props.onClick(event)
    }
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

  setInnerRef = (node: HTMLElement) => {
    this.props.inputRef(node)
    this.props.innerRef(node)
  }

  getIdFromContextProps = (props: FormLabelContextProps = { id: '' }) => {
    return props.id || this.state.id
  }

  getInputMarkup = (props: FormLabelContextProps = { id: '' }) => {
    const {
      checked: propActive,
      disabled,
      inputRef,
      innerRef,
      name,
      value,
      ...rest
    } = this.props
    const { checked } = this.state

    const id = this.getIdFromContextProps(props)

    return (
      <InputUI
        {...getValidProps(rest)}
        aria-checked={checked}
        className="c-Switch__input"
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={this.handleOnBlur}
        onChange={this.handleOnChange}
        onFocus={this.handleOnFocus}
        onClick={this.handleOnClick}
        innerRef={this.setInnerRef}
        role="switch"
        type="checkbox"
        value={value}
      />
    )
  }

  render() {
    const {
      className,
      disabled,
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
      disabled && 'is-disabled',
      shouldShowChecked && 'is-checked',
      isLoading && 'is-loading',
      size && `is-${size}`,
      state && `is-${state}`,
      className
    )

    const backdropClassName = classNames(
      'c-Switch__backdrop',
      shouldShowChecked && 'is-checked',
      disabled && 'is-disabled',
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
        {(props: FormLabelContextProps) => (
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
