import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Backdrop from '../Input/Backdrop'
import HelpText from '../HelpText'
import Label from '../Label'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { standardSizeTypes, stateTypes } from '../../constants/propTypes'

export const optionType = PropTypes.oneOfType([
  PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  PropTypes.string,
])

export const optionsType = PropTypes.arrayOf(optionType)

export const groupType = PropTypes.shape({
  label: PropTypes.string,
  value: optionsType,
})

export const propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  forceAutoFocusTimeout: PropTypes.number,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  hintText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  isFocused: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string,
  options: PropTypes.oneOfType([
    groupType,
    optionType,
    optionsType,
    PropTypes.array,
    PropTypes.string,
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  removeStateStylesOnFocus: PropTypes.bool,
  size: standardSizeTypes,
  state: stateTypes,
  value: PropTypes.string,
}

const defaultProps = {
  autoFocus: false,
  disabled: false,
  forceAutoFocusTimeout: 120,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  options: [],
  removeStateStylesOnFocus: false,
  value: '',
}

const PLACEHOLDER_VALUE = '__placeholder__'

class Select extends Component {
  constructor(props) {
    super()
    this.state = {
      state: props.state,
      value: props.value,
    }
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.selectNode = null
  }

  componentDidMount() {
    this.maybeForceAutoFocus()
  }

  componentWillReceiveProps(nextProps) {
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

  maybeForceAutoFocus() {
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

  handleOnChange(e) {
    const value = e.currentTarget.value
    this.props.onChange(value)

    this.setState({
      value,
    })
  }

  handleOnFocus(e) {
    const { onFocus, removeStateStylesOnFocus } = this.props
    const { state } = this.state
    if (removeStateStylesOnFocus && state) {
      this.setState({ state: null })
    }
    onFocus(e)
  }

  hasPlaceholder() {
    return this.state.value === '' && this.props.placeholder
  }

  render() {
    const {
      children,
      className,
      disabled,
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
      const hasOptions =
        option.hasOwnProperty('value') && Array.isArray(option.value)
      // Group
      if (hasOptions) {
        const label = option.label
        // Recursion!
        return (
          <optgroup className="c-Select__optGroup" label={label} key={label}>
            {option.value.map(renderOptions)}
          </optgroup>
        )
      }
      // Option
      if (typeof option === 'string') {
        return (
          <option className={optionClassName} key={option} value={option}>
            {option}
          </option>
        )
      } else {
        return (
          <option
            key={option.value}
            className={optionClassName}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
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

    const labelMarkup = label ? (
      <Label className="c-Select__label" for={id}>
        {label}
      </Label>
    ) : null

    const prefixMarkup = prefix ? (
      <div className="c-Select__item c-Select__prefix">{prefix}</div>
    ) : null

    const hintTextMarkup = hintText ? (
      <HelpText className="c-Select__hintText" muted>
        {hintText}
      </HelpText>
    ) : null

    const helpTextMarkup = helpText ? (
      <HelpText className="c-Select__helpText" state={state}>
        {helpText}
      </HelpText>
    ) : null

    const selectedValue = hasPlaceholder ? PLACEHOLDER_VALUE : this.state.value

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
          <div className="c-SelectIcon" />
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

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
