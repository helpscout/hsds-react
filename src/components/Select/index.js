// @flow
import type { UISize, UIState } from '../../constants/types'
import type {
  SelectGroup,
  SelectOptions,
  SelectOption,
  SelectValue,
} from './types'
import React, { PureComponent as Component } from 'react'
import Backdrop from '../Input/Backdrop'
import HelpText from '../HelpText'
import Label from '../Label'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import { STATES } from '../../constants/index'
import classNames from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'

type SelectEvent = SyntheticEvent<HTMLSelectElement>
type SelectOptionProp =
  | SelectGroup
  | SelectOptions
  | SelectOption
  | Array<any>
  | string

type Props = {
  autoFocus: boolean,
  children?: any,
  className: string,
  disabled: boolean,
  errorIcon: string,
  errorMessage: string,
  forceAutoFocusTimeout: number,
  helpText: any,
  hintText: any,
  id: string,
  isFocused: boolean,
  label: any,
  name: string,
  options: SelectOptionProp,
  onBlur: (event: SelectEvent) => void,
  onChange: (value: SelectValue) => void,
  onFocus: (event: SelectEvent) => void,
  placeholder: string,
  prefix: string,
  removeStateStylesOnFocus: boolean,
  seamless?: boolean,
  style?: Object,
  size: UISize,
  state: UIState,
  success: boolean,
  value: string,
}

type State = {
  state?: UIState,
  value: SelectValue,
}

const PLACEHOLDER_VALUE = '__placeholder__'

class Select extends Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    errorIcon: 'alert',
    forceAutoFocusTimeout: 120,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    options: [],
    removeStateStylesOnFocus: false,
    value: '',
  }

  selectNode: ?HTMLSelectElement = null

  constructor(props: Props) {
    super(props)
    this.state = {
      state: props.state,
      value: props.value,
    }
  }

  componentDidMount() {
    this.autoFocus()
  }

  componentWillReceiveProps(nextProps: Props) {
    const { isFocused, state } = nextProps
    const prevState = this.state.state

    /* istanbul ignore else */
    if (state !== prevState) {
      this.setState({ state })
    }

    /* istanbul ignore else */
    if (isFocused) {
      this.forceAutoFocus()
    }
  }

  componentWillUnmount() {
    this.selectNode = null
  }

  autoFocus() {
    const { autoFocus, isFocused } = this.props

    if (autoFocus || isFocused) {
      this.forceAutoFocus()
    }
  }

  forceAutoFocus() {
    const { forceAutoFocusTimeout } = this.props
    setTimeout(() => {
      /* istanbul ignore else */
      if (this.selectNode) {
        this.selectNode.focus()
      }
    }, forceAutoFocusTimeout)
  }

  handleOnChange(event: SelectEvent) {
    const value = event.currentTarget.value
    this.props.onChange(value)

    this.setState({
      value,
    })
  }

  handleOnFocus = (event: SelectEvent) => {
    const { onFocus, removeStateStylesOnFocus } = this.props
    const { state } = this.state

    if (removeStateStylesOnFocus && state) {
      this.setState({ state: null })
    }

    onFocus(event)
  }

  hasPlaceholder() {
    return this.state.value === '' && this.props.placeholder
  }

  makeHelpTextMarkup = () => {
    const { helpText } = this.props

    return (
      helpText && (
        <HelpText className="c-Select__helpText" muted>
          {helpText}
        </HelpText>
      )
    )
  }

  makeHintTextMarkup = () => {
    const { hintText } = this.props

    return (
      hintText && (
        <HelpText className="c-Select__hintText" muted>
          {hintText}
        </HelpText>
      )
    )
  }

  makeLabelMarkup = () => {
    const { id, label } = this.props

    return (
      label && (
        <Label className="c-Select__label" for={id}>
          {label}
        </Label>
      )
    )
  }

  makePrefixMarkup = () => {
    const { prefix } = this.props

    return (
      prefix && <div className="c-Select__item c-Select__prefix">{prefix}</div>
    )
  }

  makeErrorMarkup = () => {
    const { errorIcon, errorMessage, state } = this.props
    const shouldRenderError = state === STATES.error

    if (!shouldRenderError) return null

    return (
      <div
        className={classNames('c-Select__item', 'c-Select__suffix', 'is-icon')}
      >
        <Tooltip display="block" placement="top-end" title={errorMessage}>
          <Icon
            name={errorIcon}
            state={STATES.error}
            className="c-Select__errorIcon"
          />
        </Tooltip>
      </div>
    )
  }

  render() {
    const {
      children,
      className,
      disabled,
      errorIcon,
      errorMessage,
      forceAutoFocusTimeout,
      helpText,
      hintText,
      id,
      isFocused,
      label,
      onChange,
      onFocus,
      options,
      placeholder,
      prefix,
      removeStateStylesOnFocus,
      seamless,
      size,
      state: stateProp,
      style: styleProp,
      success,
      value,
      ...rest
    } = this.props

    const { state } = this.state

    const handleOnFocus = this.handleOnFocus
    const hasPlaceholder = this.hasPlaceholder()

    const componentClassName = classNames(
      'c-Select',
      disabled && 'is-disabled',
      hasPlaceholder && 'has-placeholder',
      seamless && 'is-seamless',
      state && `is-${state}`,
      className
    )

    const fieldClassName = classNames(
      'c-Select__inputField',
      'c-InputField',
      size && `is-${size}`
    )
    const optionClassName = 'c-Select__option'

    const renderOptions = option => {
      // HTML <optgroup> only allows for single level nesting
      // $FlowFixMe
      const hasOptions =
        !isString(option) &&
        option.hasOwnProperty('value') &&
        Array.isArray(option.value)

      const optionDisabled = option.disabled
      const optionLabel = option.label
      const optionValue = option.value

      // Group
      if (hasOptions) {
        // Recursion!
        return (
          <optgroup
            className="c-Select__optGroup"
            label={optionLabel}
            key={optionLabel}
          >
            {optionValue.map(renderOptions)}
          </optgroup>
        )
      }
      // Option
      if (isString(option)) {
        return (
          <option className={optionClassName} key={option} value={option}>
            {option}
          </option>
        )
      } else {
        return (
          <option
            key={optionValue}
            className={optionClassName}
            value={optionValue}
            disabled={optionDisabled}
          >
            {optionLabel}
          </option>
        )
      }
    }

    const optionsMarkup =
      children ||
      (Array.isArray(options)
        ? options.map(renderOptions)
        : renderOptions(options))

    const placeholderMarkup = placeholder ? (
      <option
        className={optionClassName}
        label={placeholder}
        value={PLACEHOLDER_VALUE}
        disabled
      >
        {placeholder}
      </option>
    ) : null

    const selectedValue = hasPlaceholder ? PLACEHOLDER_VALUE : this.state.value

    const helpTextMarkup = this.makeHelpTextMarkup()
    const hintTextMarkup = this.makeHintTextMarkup()
    const labelMarkup = this.makeLabelMarkup()
    const prefixMarkup = this.makePrefixMarkup()
    const errorMarkup = this.makeErrorMarkup()

    return (
      <div className="c-InputWrapper" style={styleProp}>
        {labelMarkup}
        {hintTextMarkup}
        <div className={componentClassName}>
          {prefixMarkup}
          <select
            className={fieldClassName}
            disabled={disabled}
            id={id}
            onChange={e => this.handleOnChange(e)}
            onFocus={handleOnFocus}
            ref={node => {
              this.selectNode = node
            }}
            value={selectedValue}
            {...rest}
          >
            {placeholderMarkup}
            {optionsMarkup}
          </select>
          <div className={classNames('c-SelectIcon', state && `is-${state}`)} />
          {errorMarkup}
          <Backdrop
            className="c-Select__backdrop"
            disabled={disabled}
            state={state}
          />
        </div>
        {helpTextMarkup}
      </div>
    )
  }
}

export default Select
