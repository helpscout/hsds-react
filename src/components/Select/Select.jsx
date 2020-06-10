import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import FormLabelContext from '../FormLabel/Context'
import InputBackdropV2 from '../Input/Input.BackdropV2'
import HelpText from '../HelpText'
import Label from '../Label'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import Arrows from './Select.Arrows'
import { STATES } from '../../constants'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { InputWrapperUI } from '../Input/Input.css'
import { SelectUI, FieldUI, InlinePrefixSuffixUI, ItemUI } from './Select.css'

const PLACEHOLDER_VALUE = '__placeholder__'
const uniqueID = createUniqueIDFactory('Select')

export class Select extends React.PureComponent {
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

  static Arrows = Arrows

  optionClassName = 'c-Select__option'

  constructor(props) {
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isFocused, state } = nextProps
    const prevState = this.state.state

    if (state !== prevState) {
      this.setState({ state })
    }

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
      if (this.selectNode) {
        this.selectNode.focus()
      }
    }, forceAutoFocusTimeout)
  }

  handleOnChange = event => {
    const value = event.currentTarget.value
    this.props.onChange(value)

    this.setState({
      value,
    })
  }

  handleOnBlur = event => {
    this.setState({
      isFocused: false,
    })

    this.props.onBlur(event)
  }

  handleOnFocus = event => {
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

  getInlinePrefixSuffixClassName({ type, icon }) {
    const { seamless, state } = this.props

    return classNames(
      'c-Select__item',
      type && `is-${type}`,
      icon && 'is-icon',
      seamless && 'is-seamless',
      state && `is-${state}`
    )
  }

  getPrefixMarkup = () => {
    const { prefix } = this.props

    return (
      prefix && (
        <InlinePrefixSuffixUI
          className={this.getInlinePrefixSuffixClassName({ type: 'prefix' })}
        >
          {prefix}
        </InlinePrefixSuffixUI>
      )
    )
  }

  getErrorMarkup = () => {
    const { errorIcon, errorMessage, state, tabIndex = 0 } = this.props
    const shouldRenderError = state === STATES.error

    if (!shouldRenderError) return null

    return (
      <ItemUI
        className={classNames('c-Select__item', 'c-Select__suffix', 'is-icon')}
      >
        <Tooltip display="block" placement="top-end" title={errorMessage}>
          <Icon
            name={errorIcon}
            state={STATES.error}
            className="c-Select__errorIcon"
            tabIndex={tabIndex}
          />
        </Tooltip>
      </ItemUI>
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

  renderOptions = option => {
    // HTML <optgroup> only allows for single level nesting
    const hasOptions =
      option.hasOwnProperty('value') && Array.isArray(option.value)

    // Group
    if (!isString(option) && hasOptions) {
      // Recursion!
      return (
        <optgroup
          className="c-Select__optGroup"
          label={option.label}
          key={option.label}
        >
          {option.value.map(this.renderOptions)}
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
          key={option.value}
          className={this.optionClassName}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      )
    }
  }

  setSelectNode = node => {
    this.selectNode = node
    this.props.innerRef(node)
  }

  getSelectMarkup = props => {
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
      tabIndex,
      value,
      ...rest
    } = this.props

    const fieldClassName = classNames(
      'c-Select__inputField',
      'c-InputField',
      this.hasPlaceholder() && 'has-placeholder',
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
      <FieldUI
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
      </FieldUI>
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
      width,
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

    const style = {
      ...styleProp,
      maxWidth: width,
    }

    return (
      <FormLabelContext.Consumer>
        {props => (
          <InputWrapperUI className="c-InputWrapper" style={style}>
            {labelMarkup}
            {hintTextMarkup}
            <SelectUI className={componentClassName}>
              {prefixMarkup}
              {this.getSelectMarkup(props)}
              <Arrows className="c-SelectIcon" state={state} />
              {errorMarkup}
              <InputBackdropV2
                className="c-Select__backdrop"
                disabled={disabled}
                isFirst={isFirst}
                isFocused={isFocused}
                isNotOnly={isNotOnly}
                isLast={isLast}
                isSeamless={seamless}
                state={state}
              />
            </SelectUI>
            {helpTextMarkup}
          </InputWrapperUI>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

const optionShape = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
}

const selectOptionShape = PropTypes.oneOfType([
  PropTypes.shape(optionShape),
  PropTypes.string,
])

Select.propTypes = {
  autoFocus: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  errorIcon: PropTypes.string,
  errorMessage: PropTypes.string,
  forceAutoFocusTimeout: PropTypes.number,
  helpText: PropTypes.any,
  hintText: PropTypes.any,
  id: PropTypes.string,
  innerRef: PropTypes.func,
  isFocused: PropTypes.bool,
  isFirst: PropTypes.bool,
  isNotOnly: PropTypes.bool,
  isLast: PropTypes.bool,
  label: PropTypes.any,
  name: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(selectOptionShape),
    ]),
    PropTypes.oneOfType([PropTypes.shape(optionShape), PropTypes.string]),
    PropTypes.arrayOf(selectOptionShape),
    PropTypes.string,
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  removeStateStylesOnFocus: PropTypes.bool,
  seamless: PropTypes.bool,
  style: PropTypes.object,
  size: PropTypes.oneOf(['xs', 'xssm', 'sm', 'md', 'lg', '', null]),
  state: PropTypes.oneOf(['error', 'info', 'success', 'warning', '', null]),
  success: PropTypes.bool,
  tabIndex: PropTypes.number,
  value: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Select
