import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/constants'

const optionType = PropTypes.oneOfType([
  PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string
  }),
  PropTypes.string
])

const optionsType = PropTypes.arrayOf(optionType)

const groupType = PropTypes.shape({
  label: PropTypes.string,
  value: optionsType
})

const propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.oneOfType([
    groupType,
    optionType,
    optionsType,
    PropTypes.string
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  seamless: PropTypes.bool,
  size: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  value: PropTypes.string,
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
}
const defaultProps = {
  autoFocus: false,
  className: '',
  disabled: false,
  error: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  options: [],
  prefix: '',
  readOnly: false,
  seamless: false,
  size: '',
  success: false,
  value: '',
  warning: false
}

const PLACEHOLDER_VALUE = '__placeholder__'

class Select extends Component {
  constructor (props) {
    super()
    this.state = {
      placeholder: props.placeholder,
      value: props.value
    }
  }

  handleOnChange (e) {
    const value = e.currentTarget.value
    this.props.onChange(value)

    this.setState({
      placeholder: false,
      value
    })
  }

  hasPlaceholder () {
    return this.state.value === '' && this.state.placeholder
  }

  render () {
    const {
      className,
      disabled,
      error,
      onChange,
      options,
      placeholder,
      prefix,
      readOnly,
      seamless,
      size,
      success,
      warning,
      value,
      ...rest
    } = this.props

    const hasPlaceholder = this.hasPlaceholder()

    const selectClassName = classNames(
      'c-Select',
      disabled && 'is-disabled',
      error && 'is-error',
      hasPlaceholder && 'has-placeholder',
      readOnly && 'is-readonly',
      seamless && 'is-seamless',
      success && 'is-success',
      warning && 'is-warning',
      className
    )

    const fieldClassName = classNames('c-InputField', size && `is-${size}`)

    const renderOptions = option => {
      // HTML <optgroup> only allows for single level nesting
      const hasOptions =
        option.hasOwnProperty('value') && Array.isArray(option.value)
      // Group
      if (hasOptions) {
        const label = option.title
        // Recursion!
        return (
          <optgroup label={label} key={label}>
            {option.value.map(renderOptions)}
          </optgroup>
        )
      }
      // Option
      if (typeof option === 'string') {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      } else {
        return (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        )
      }
    }

    const optionsMarkup = options.map(renderOptions)

    const placeholderMarkup = hasPlaceholder
      ? <option
        label={this.state.placeholder}
        value={PLACEHOLDER_VALUE}
        disabled
        hidden
        />
      : null

    const prefixMarkup = prefix
      ? <div className='c-Select__item c-Select__prefix'>
        {prefix}
      </div>
      : null

    const selectedValue = hasPlaceholder ? PLACEHOLDER_VALUE : this.state.value

    const statefulHelperTextMarkup = () => {
      return [error, success, warning].map(state => {
        if (state && typeof state === 'string' && state.length) {
          return (
            <div className='c-InputHelperLabel' key={state}>
              {state}
            </div>
          )
        }
      })
    }

    return (
      <div className='c-InputWrapper'>
        <div className={selectClassName}>
          {prefixMarkup}
          <select
            className={fieldClassName}
            disabled={disabled}
            onChange={e => this.handleOnChange(e)}
            readOnly={readOnly}
            value={selectedValue}
            {...rest}
          >
            {placeholderMarkup}
            {optionsMarkup}
          </select>
          <div className='c-SelectIcon' />
          <div className='c-InputBackdrop' />
        </div>
        {statefulHelperTextMarkup()}
      </div>
    )
  }
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
