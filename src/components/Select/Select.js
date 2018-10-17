// @flow
import type { UISize, UIState } from '../../constants/types'
import type {
  SelectGroup,
  SelectOptions,
  SelectOption,
  SelectValue,
} from './types'
import React, { PureComponent as Component } from 'react'
import { getValidProps } from '@helpscout/react-utils'
import FormLabelContext from '../FormLabel/Context'
import Backdrop from '../Input/BackdropV2'
import HelpText from '../HelpText'
import Label from '../Label'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import { STATES } from '../../constants/index'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { COMPONENT_KEY } from './utils'
import { InputWrapperUI } from '../Input/styles/Input.css.js'

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
  isFirst: boolean,
  isNotOnly: boolean,
  isLast: boolean,
  label: any,
  name: string,
  options: SelectOptionProp,
  onBlur: (event: SelectEvent) => void,
  onChange: (value: SelectValue) => void,
  onFocus: (event: SelectEvent) => void,
  placeholder: string,
  prefix: string,
  removeStateStylesOnFocus: boolean,
  seamless: boolean,
  style?: Object,
  size: UISize,
  state: UIState,
  success: boolean,
  value: string,
}

type State = {
  id?: string,
  isFocused: boolean,
  state?: UIState,
  value: SelectValue,
}

const PLACEHOLDER_VALUE = '__placeholder__'

const uniqueID = createUniqueIDFactory('Select')

class Select extends Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    errorIcon: 'alert',
    innerRef: noop,
    forceAutoFocusTimeout: 120,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    options: [],
    removeStateStylesOnFocus: false,
    seamless: false,
    value: '',
  }

  optionClassName = 'c-Select__option'
  selectNode: ?HTMLSelectElement = null

  constructor(props: Props) {
    super(props)
    this.state = {
      id: props.id || uniqueID(),
      isFocused: props.isFocused,
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

    this.setState({
      isFocused: true,
    })

    setTimeout(() => {
      /* istanbul ignore else */
      if (this.selectNode) {
        this.selectNode.focus()
      }
    }, forceAutoFocusTimeout)
  }

  handleOnChange = (event: SelectEvent) => {
    const value = event.currentTarget.value
    this.props.onChange(value)

    this.setState({
      value,
    })
  }

  handleOnBlur = (event: SelectEvent) => {
    this.setState({
      isFocused: false,
    })

    this.props.onBlur(event)
  }

  handleOnFocus = (event: SelectEvent) => {
    const { onFocus, removeStateStylesOnFocus } = this.props
    const { state } = this.state

    if (removeStateStylesOnFocus && state) {
      this.setState({ state: null })
    }

    this.setState({
      isFocused: true,
    })

    onFocus(event)
  }

  hasPlaceholder() {
    return this.state.value === '' && this.props.placeholder
  }

  getHelpTextMarkup = () => {
    const { helpText } = this.props

    return (
      helpText && <HelpText className="c-Select__helpText">{helpText}</HelpText>
    )
  }

  getHintTextMarkup = () => {
    const { hintText } = this.props

    return (
      hintText && (
        <HelpText className="c-Select__hintText" isCompact>
          {hintText}
        </HelpText>
      )
    )
  }

  getLabelMarkup = () => {
    const { id, label } = this.props

    return (
      label && (
        <Label className="c-Select__label" for={id}>
          {label}
        </Label>
      )
    )
  }

  getPrefixMarkup = () => {
    const { prefix } = this.props

    return (
      prefix && (
        <div className="c-Select__item c-Select__inlinePrefix">{prefix}</div>
      )
    )
  }

  getErrorMarkup = () => {
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

  getPlaceholderMarkup = () => {
    const { placeholder } = this.props

    return (
      placeholder && (
        <option
          className={this.optionClassName}
          label={placeholder}
          value={PLACEHOLDER_VALUE}
          disabled
        >
          {placeholder}
        </option>
      )
    )
  }

  renderOptions = (option: SelectOption) => {
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
          {optionValue.map(this.renderOptions)}
        </optgroup>
      )
    }
    // Option
    if (isString(option)) {
      return (
        <option className={this.optionClassName} key={option} value={option}>
          {option}
        </option>
      )
    } else {
      return (
        <option
          key={optionValue}
          className={this.optionClassName}
          value={optionValue}
          disabled={optionDisabled}
        >
          {optionLabel}
        </option>
      )
    }
  }

  setSelectNode = (node: HTMLSelectElement) => {
    this.selectNode = node
    this.props.innerRef(node)
  }

  getSelectMarkup = (props: Object = {}) => {
    const {
      children,
      className,
      disabled,
      errorIcon,
      errorMessage,
      forceAutoFocusTimeout,
      helpText,
      hintText,
      innerRef,
      isFocused,
      isFirst,
      isNotOnly,
      isLast,
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

    const fieldClassName = classNames(
      'c-Select__inputField',
      'c-InputField',
      size && `is-${size}`
    )

    const placeholderMarkup = this.getPlaceholderMarkup()

    const optionsMarkup =
      children ||
      (Array.isArray(options)
        ? options.map(this.renderOptions)
        : this.renderOptions(options))

    const hasPlaceholder = this.hasPlaceholder()

    const id = props.id || this.state.id
    const selectedValue = hasPlaceholder ? PLACEHOLDER_VALUE : this.state.value

    return (
      <select
        {...getValidProps(rest)}
        className={fieldClassName}
        disabled={disabled}
        id={id}
        onBlur={this.handleOnBlur}
        onChange={this.handleOnChange}
        onFocus={this.handleOnFocus}
        ref={this.setSelectNode}
        value={selectedValue}
      >
        {placeholderMarkup}
        {optionsMarkup}
      </select>
    )
  }

  render() {
    const {
      className,
      disabled,
      isFirst,
      isNotOnly,
      isLast,
      seamless,
      style: styleProp,
    } = this.props

    const { isFocused, state } = this.state

    const componentClassName = classNames(
      'c-Select',
      disabled && 'is-disabled',
      isFocused && 'is-focused',
      this.hasPlaceholder() && 'has-placeholder',
      seamless && 'is-seamless',
      state && `is-${state}`,
      className
    )

    const helpTextMarkup = this.getHelpTextMarkup()
    const hintTextMarkup = this.getHintTextMarkup()
    const labelMarkup = this.getLabelMarkup()
    const prefixMarkup = this.getPrefixMarkup()
    const errorMarkup = this.getErrorMarkup()

    return (
      <FormLabelContext.Consumer>
        {(props: Object) => (
          <InputWrapperUI className="c-InputWrapper" style={styleProp}>
            {labelMarkup}
            {hintTextMarkup}
            <div className={componentClassName}>
              {prefixMarkup}
              {this.getSelectMarkup(props)}
              <div
                className={classNames('c-SelectIcon', state && `is-${state}`)}
              />
              {errorMarkup}
              <Backdrop
                className="c-Select__backdrop"
                disabled={disabled}
                isFirst={isFirst}
                isFocused={isFocused}
                isNotOnly={isNotOnly}
                isLast={isLast}
                isSeamless={seamless}
                state={state}
              />
            </div>
            {helpTextMarkup}
          </InputWrapperUI>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Select)

export default Select
