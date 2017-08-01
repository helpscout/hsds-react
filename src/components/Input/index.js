// See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/TextField.tsx

import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Backdrop from './Backdrop'
import HelpText from './HelpText'
import Label from '../Label'
import Resizer from './Resizer'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'

const propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  resizable: PropTypes.bool,
  seamless: PropTypes.bool,
  size: PropTypes.string,
  state: PropTypes.string,
  suffix: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}
const defaultProps = {
  autoFocus: false,
  disabled: false,
  multiline: null,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  readOnly: false,
  resizable: false,
  seamless: false,
  type: 'text',
  value: ''
}

const uniqueID = createUniqueIDFactory('Input')

class Input extends Component {
  constructor (props) {
    super()
    this.state = {
      height: null,
      value: props.value
    }
  }

  handleOnChange (e) {
    const value = e.currentTarget.value
    this.setState({ value })
    this.props.onChange(value)
  }

  handleExpandingResize (height) {
    this.setState({ height })
  }

  render () {
    const {
      autoFocus,
      disabled,
      helpText,
      id,
      inputRef,
      label,
      multiline,
      name,
      onBlur,
      onFocus,
      placeholder,
      prefix,
      readOnly,
      resizable,
      seamless,
      size,
      state,
      suffix,
      type,
      ...rest
    } = this.props

    const { height, value } = this.state

    const handleOnChange = this.handleOnChange.bind(this)
    const handleExpandingResize = this.handleExpandingResize.bind(this)

    const className = classNames(
      'c-Input',
      disabled && 'is-disabled',
      multiline && 'is-multiline',
      readOnly && 'is-readonly',
      resizable && 'is-resizable',
      seamless && 'is-seamless',
      state && `is-${state}`,
      value && 'has-value',
      this.props.className
    )

    const inputID = id || uniqueID()
    const fieldClassName = classNames('c-InputField', size && `is-${size}`)

    // Ignoring as height calculation isn't possible with JSDOM
    // (which is what Enzyme uses for tests)
    /* istanbul ignore next */
    const style = multiline && height ? { height } : null

    const resizer =
      multiline != null
        ? <Resizer
          contents={value || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 1}
          onResize={handleExpandingResize}
          />
        : null

    const labelMarkup = label
      ? <Label for={inputID}>{label}</Label>
      : null

    const prefixMarkup = prefix
      ? <div className='c-Input__item c-Input__prefix'>
        {prefix}
      </div>
      : null

    const suffixMarkup = suffix
      ? <div className='c-Input__item c-Input__suffix'>
        {suffix}
      </div>
      : null

    const helpTextMarkup = helpText
      ? <HelpText state={state}>
        {helpText}
      </HelpText>
      : null

    const inputElement = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      className: fieldClassName,
      id: inputID,
      onChange: handleOnChange,
      ref: inputRef,
      autoFocus,
      disabled,
      name,
      onBlur,
      onFocus,
      placeholder,
      readOnly,
      style,
      type,
      value
    })

    return (
      <div className='c-InputWrapper'>
        {labelMarkup}
        <div className={className}>
          {prefixMarkup}
          {inputElement}
          {suffixMarkup}
          <Backdrop disabled={disabled} state={state} />
          {resizer}
        </div>
        {helpTextMarkup}
      </div>
    )
  }
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
