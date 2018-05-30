import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Backdrop from './Backdrop'
import Resizer from './Resizer'
import Static from './Static'
import HelpText from '../HelpText'
import Label from '../Label'
import KeypressListener from '../KeypressListener'
import { scrollLockY } from '../ScrollLock'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { standardSizeTypes, stateTypes } from '../../constants/propTypes'
import { getTextAreaLineCurrent, getTextAreaLineTotal } from './helpers'

export const propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  forceAutoFocusTimeout: PropTypes.number,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  hintText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  inputRef: PropTypes.func,
  isFocused: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  modalhelpText: PropTypes.string,
  multiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  offsetAmount: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onWheel: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  removeStateStylesOnFocus: PropTypes.bool,
  resizable: PropTypes.bool,
  seamless: PropTypes.bool,
  size: standardSizeTypes,
  state: stateTypes,
  suffix: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}

const defaultProps = {
  autoFocus: false,
  disabled: false,
  forceAutoFocusTimeout: 120,
  inputRef: noop,
  isFocused: false,
  multiline: null,
  offsetAmount: 0,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onWheel: noop,
  readOnly: false,
  removeStateStylesOnFocus: false,
  resizable: false,
  seamless: false,
  type: 'text',
  value: '',
}

const uniqueID = createUniqueIDFactory('Input')

class Input extends Component {
  constructor(props) {
    super()
    this.state = {
      id: props.id || uniqueID(),
      height: null,
      state: props.state,
      value: props.value,
    }
    this.inputNode = null
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnInputFocus = this.handleOnInputFocus.bind(this)
    this.handleOnEnter = this.handleOnEnter.bind(this)
    this.handleOnWheel = this.handleOnWheel.bind(this)
    this.handleExpandingResize = this.handleExpandingResize.bind(this)
  }

  componentDidMount() {
    this.maybeForceAutoFocus()
  }

  componentWillReceiveProps(nextProps) {
    const { isFocused, value, state } = nextProps
    const prevValue = this.state.value
    const prevState = this.state.state

    if (value !== prevValue) {
      this.setState({ value })
    }

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
    this.inputNode = null
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
      if (this.inputNode) {
        this.inputNode.focus()
      }
    }, forceAutoFocusTimeout)
  }

  scrollToBottom() {
    /* istanbul ignore next */
    if (!this.inputNode || !this.inputNode.scrollTo) return
    /* istanbul ignore next */
    /**
     * Skipping this test, due to lack of JSDOM DOM property support.
     */
    /* istanbul ignore next */
    const currentLine = getTextAreaLineCurrent(this.inputNode)
    /* istanbul ignore next */
    const totalLines = getTextAreaLineTotal(this.inputNode)

    /* istanbul ignore next */
    if (currentLine === totalLines) {
      this.inputNode.scrollTo(0, this.inputNode.scrollHeight)
    }
  }

  handleOnEnter() {
    if (!this.props.multiline) return
    this.scrollToBottom()
  }

  handleOnChange(e) {
    const value = e.currentTarget.value
    this.setState({ value })
    this.props.onChange(value)
  }

  handleOnInputFocus(e) {
    const { onFocus, removeStateStylesOnFocus } = this.props
    const { state } = this.state
    if (removeStateStylesOnFocus && state) {
      this.setState({ state: null })
    }
    onFocus(e)
  }

  handleOnWheel(event) {
    const { onWheel } = this.props
    const stopPropagation = true
    scrollLockY(event, stopPropagation)
    onWheel(event)
  }

  handleExpandingResize(height) {
    this.setState({ height })
    this.forceAutoFocus()
  }

  render() {
    const {
      autoFocus,
      className,
      disabled,
      forceAutoFocusTimeout,
      helpText,
      hintText,
      id,
      inputRef,
      isFocused,
      label,
      maxHeight,
      multiline,
      name,
      offsetAmount,
      onBlur,
      onFocus,
      onWheel,
      placeholder,
      prefix,
      readOnly,
      removeStateStylesOnFocus,
      resizable,
      seamless,
      size,
      state: stateProp,
      style: styleProp,
      suffix,
      type,
      ...rest
    } = this.props

    const { height, id: inputID, value, state } = this.state

    const handleOnChange = this.handleOnChange
    const handleOnInputFocus = this.handleOnInputFocus
    const handleOnWheel = this.handleOnWheel
    const handleExpandingResize = this.handleExpandingResize

    const componentClassName = classNames(
      'c-Input',
      disabled && 'is-disabled',
      maxHeight && 'has-maxHeight',
      multiline && 'is-multiline',
      readOnly && 'is-readonly',
      resizable && 'is-resizable',
      seamless && 'is-seamless',
      state && `is-${state}`,
      value && 'has-value',
      className
    )

    const fieldClassName = classNames(
      'c-Input__inputField',
      'c-InputField',
      size && `is-${size}`
    )

    // Ignoring as height calculation isn't possible with JSDOM
    // (which is what Enzyme uses for tests)
    /* istanbul ignore next */
    const style = multiline
      ? {
          height,
          maxHeight,
        }
      : null

    const resizer =
      multiline != null ? (
        <Resizer
          contents={value || placeholder}
          currentHeight={height}
          minimumLines={typeof multiline === 'number' ? multiline : 1}
          offsetAmount={offsetAmount}
          onResize={handleExpandingResize}
          seamless={seamless}
        />
      ) : null

    const labelMarkup = label ? (
      <Label className="c-Input__label" for={inputID}>
        {label}
      </Label>
    ) : null

    const prefixMarkup = prefix ? (
      <div className="c-Input__item c-Input__prefix">{prefix}</div>
    ) : null

    const suffixMarkup = suffix ? (
      <div className="c-Input__item c-Input__suffix">{suffix}</div>
    ) : null

    const hintTextMarkup = hintText ? (
      <HelpText className="c-Input__hintText" muted>
        {hintText}
      </HelpText>
    ) : null

    const helpTextMarkup = helpText ? (
      <HelpText className="c-Input__helpText" state={state}>
        {helpText}
      </HelpText>
    ) : null

    const inputElement = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      className: fieldClassName,
      id: inputID,
      onChange: handleOnChange,
      ref: node => {
        this.inputNode = node
        inputRef(node)
      },
      autoFocus,
      disabled,
      name,
      onBlur,
      onFocus: handleOnInputFocus,
      onWheel: handleOnWheel,
      placeholder,
      readOnly,
      style,
      type,
      value,
    })

    return (
      <div className="c-InputWrapper" style={styleProp}>
        <KeypressListener
          keyCode={Keys.ENTER}
          handler={this.handleOnEnter}
          noModifier
          type="keyup"
        />
        <KeypressListener
          keyCode={Keys.ENTER}
          handler={this.handleOnEnter}
          modifier="shift"
          type="keyup"
        />
        {labelMarkup}
        {hintTextMarkup}
        <div className={componentClassName}>
          {prefixMarkup}
          {inputElement}
          {suffixMarkup}
          <Backdrop
            className="c-Input__backdrop"
            disabled={disabled}
            readOnly={readOnly}
            state={state}
          />
          {resizer}
        </div>
        {helpTextMarkup}
      </div>
    )
  }
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps
Input.Backdrop = Backdrop
Input.Resizer = Resizer
Input.Static = Static

export default Input
