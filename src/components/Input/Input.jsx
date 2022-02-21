/* eslint react/no-deprecated: off */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isNil from 'lodash.isnil'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import Badge from '../Badge'
import FormLabelContext from '../FormLabel/Context'
import InputAddOn from './Input.AddOn'
import InputBackdropV2 from './Input.BackdropV2'
import InputPrefix from './Input.Prefix'
import InputResizer from './Input.Resizer'
import InputStatic from './Input.Static'
import InputSuffix from './Input.Suffix'
import HelpText from '../HelpText'
import Icon from '../Icon'
import Label from '../Label'
import { scrollLockY } from '../ScrollLock/ScrollLock.utils'
import Tooltip from '../Tooltip'
import { STATES } from '../../constants'
import Keys from '../../constants/Keys'
import { createUniqueIDFactory } from '../../utilities/id'
import { isModifierKeyPressed } from '../../utilities/keys'
import { requestAnimationFrame } from '../../utilities/other'
import { moveCursorToEnd, isTextArea } from './Input.utils'
import {
  CharValidatorText,
  CharValidatorUI,
  InputWrapperUI,
  InlinePrefixSuffixUI,
  FieldUI,
  FieldTextAreaUI,
  InputUI,
} from './Input.css'

const uniqueID = createUniqueIDFactory('Input')
function noop() {}

export class Input extends React.PureComponent {
  static AddOn = InputAddOn
  static Backdrop = InputBackdropV2
  static Prefix = InputPrefix
  static Resizer = InputResizer
  static Static = InputStatic
  static Suffix = InputSuffix

  computedStyles
  inputNode

  constructor(props) {
    super(props)

    this.state = {
      id: props.id || uniqueID(),
      isFocused: props.isFocused,
      state: props.state,
      typingThrottle: undefined,
      typingTimeout: undefined,
      value: props.value,
      validatorCount: props.charValidatorLimit - props.value.length,
    }
  }

  autoFocusTimeoutId = setTimeout(() => '', 0)

  componentDidMount() {
    this.maybeForceAutoFocus()
    this.props.withTypingEvent &&
      this.props.refApplyCallStopTyping(this.callStopTyping.bind(this))
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isFocused, value, state } = nextProps
    const prevValue = this.state.value
    const prevState = this.state.state

    if (value !== prevValue) {
      this.setValue(value)
    }

    if (state !== prevState) {
      this.setState({ state })
    }

    if (isFocused) {
      this.forceAutoFocus()
    }
  }

  componentWillUnmount() {
    this.inputNode = null
    this.props.withTypingEvent && this.clearTypingTimeout()
    this.autoFocusTimeoutId && clearTimeout(this.autoFocusTimeoutId)
  }

  setValue = value => {
    const { inputType, withCharValidator } = this.props
    let nextValue = value

    if (inputType === 'number') {
      nextValue = value.replace(/\D/g, '')
    }

    this.setState({ value: nextValue })
    withCharValidator && this.setValidatorCount(nextValue)
    return nextValue
  }

  setValidatorCount(value) {
    const { charValidatorLimit } = this.props
    const validatorCount = charValidatorLimit - value.length

    if (value.length >= validatorCount) {
      this.setState({ validatorCount })
    }
  }

  maybeForceAutoFocus() {
    const { autoFocus, isFocused } = this.props

    if (autoFocus || isFocused) {
      this.forceAutoFocus()
      this.moveCursorToEnd()
    }
  }

  forceAutoFocus() {
    const { forceAutoFocusTimeout } = this.props

    this.autoFocusTimeoutId = setTimeout(() => {
      if (this.inputNode) {
        this.inputNode.focus()
      }

      this.setState({
        isFocused: true,
      })
    }, forceAutoFocusTimeout)
  }

  callStartTyping() {
    if (this.props.onStartTyping) {
      this.props.onStartTyping()
      this.setThrottler()
    }
  }

  callStopTyping() {
    if (this.state.typingTimeout) {
      this.clearThrottler()
      this.props.onStopTyping()
      this.clearTypingTimeout()
    }
  }

  clearTypingTimeout() {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout)
      this.setState({ typingTimeout: undefined })
    }
  }

  setTypingTimeout() {
    this.setState({
      typingTimeout: setTimeout(() => {
        this.clearThrottler()
        this.callStopTyping()
      }, this.props.typingTimeoutDelay),
    })
  }

  clearThrottler() {
    if (this.state.typingThrottle) {
      clearInterval(this.state.typingThrottle)
      this.setState({ typingThrottle: undefined })
    }
  }

  setThrottler() {
    this.setState({
      typingThrottle: setInterval(
        this.props.onStartTyping,
        this.props.typingThrottleInterval
      ),
    })
  }

  typingEvent() {
    // reset the stop debouncer every time a key is pressed
    this.clearTypingTimeout()
    this.setTypingTimeout()
    if (!this.state.typingThrottle) {
      // if there is no throttler add it
      this.callStartTyping()
    }
  }

  handleOnChange = event => {
    if (this.props.withTypingEvent) this.typingEvent()

    const value = event.currentTarget.value
    const nextValue = this.setValue(value)
    this.props.onChange(nextValue)
  }

  handleOnInputBlur = event => {
    this.setState({
      isFocused: false,
    })
    this.props.onBlur(event)
  }

  handleOnInputFocus = event => {
    const { onFocus, removeStateStylesOnFocus } = this.props
    const { state } = this.state
    if (removeStateStylesOnFocus && state) {
      this.setState({ state: null })
    }
    this.setState({
      isFocused: true,
    })
    this.moveCursorToEnd()
    onFocus(event)
  }

  handleOnWheel = event => {
    const { multiline, onWheel, scrollLock } = this.props
    event.stopPropagation()

    if (!multiline || !scrollLock) return

    const stopPropagation = true
    scrollLockY(event, stopPropagation)
    onWheel(event)
  }

  insertCarriageReturnAtCursorIndex(event) {
    const cursorIndex = event.currentTarget.selectionStart
    const nextValue = event.currentTarget.value
    const prevValue = this.state.value

    // this prevents a return being inserted if the field is completely empty
    // this works on every modifier key, and with standalone returns
    const isEmptyField =
      cursorIndex === 0 && nextValue.length === 0 && prevValue.length === 0

    if (isEmptyField) {
      event.preventDefault() // prevents shift and return from inserting a line break
      return
    }

    if (!isModifierKeyPressed(event)) return
    // this inserts a return into the value if a modifier key is also pressed
    event.preventDefault()
    event.stopPropagation()
    const newValue = `${nextValue.substr(0, cursorIndex)}\n${nextValue.substr(
      cursorIndex
    )}`
    this.setState({ value: newValue }, () => {
      this.props.onChange(this.state.value)

      this.inputNode.setSelectionRange(cursorIndex + 1, cursorIndex + 1)
    })
  }

  handleOnKeyDown = event => {
    const { hasInsertCarriageReturns } = this.props

    if (event.keyCode === Keys.ENTER) {
      this.props.onEnterDown(event)
    }

    if (hasInsertCarriageReturns && event.keyCode === Keys.ENTER) {
      this.insertCarriageReturnAtCursorIndex(event)
    }

    this.props.onKeyDown(event)
  }

  handleOnKeyUp = event => {
    if (event.keyCode === Keys.ENTER) {
      this.props.onEnterUp(event)
    }
    this.props.onKeyUp(event)
  }

  handleExpandingResize = height => {
    this.props.onResize(height)
    this.setState({ height })
    this.setComputedStylesFromHeight(height)
  }

  moveCursorToEnd = () => {
    // Not reliably testable in JSDOM + Enzyme
    if (
      !this.props.moveCursorToEnd ||
      !this.inputNode ||
      !isTextArea(this.inputNode)
    )
      return

    requestAnimationFrame(() => {
      moveCursorToEnd(this.inputNode)
    })
  }

  setInputNodeRef = node => {
    this.inputNode = node
    this.props.inputRef(node)
    this.props.innerRef(node)
  }

  // Assumption: The padding-bottom does not change after the component is
  // rendered.
  setComputedStylesFromHeight = height => {
    if (!height) return
    if (this.computedStyles) return
    if (!this.inputNode) return

    const computedStyles = window.getComputedStyle(this.inputNode)

    const { paddingBottom } = computedStyles
    this.computedStyles = {
      paddingBottom: parseInt(paddingBottom, 10),
    }
  }

  getHelpTextMarkup() {
    const { helpText, label } = this.props
    const isCompact = !!label

    return (
      helpText && (
        <HelpText className="c-Input__helpText" isCompact={isCompact}>
          {helpText}
        </HelpText>
      )
    )
  }

  getHintTextMarkup() {
    const { hintText } = this.props

    return (
      hintText && <HelpText className="c-Input__hintText">{hintText}</HelpText>
    )
  }

  getLabelMarkup() {
    const { label } = this.props
    const { id: inputID } = this.state

    return (
      label && (
        <Label className="c-Input__label" for={inputID}>
          {label}
        </Label>
      )
    )
  }

  getInlinePrefixSuffixClassName({ type, icon }) {
    const { multiline, seamless, state } = this.props

    return classNames(
      'c-Input__item',
      type && `is-${type}`,
      icon && 'is-icon',
      multiline && 'is-multiline',
      seamless && 'is-seamless',
      state && `is-${state}`
    )
  }

  getInlinePrefixMarkup() {
    const { inlinePrefix } = this.props

    return (
      inlinePrefix && (
        <InlinePrefixSuffixUI
          className={this.getInlinePrefixSuffixClassName({ type: 'prefix' })}
        >
          {inlinePrefix}
        </InlinePrefixSuffixUI>
      )
    )
  }

  getPrefixMarkup() {
    const { prefix, seamless } = this.props

    return prefix && <InputPrefix isSeamless={seamless}>{prefix}</InputPrefix>
  }

  getInlineSuffixMarkup() {
    const { inlineSuffix } = this.props

    return (
      inlineSuffix && (
        <InlinePrefixSuffixUI
          className={this.getInlinePrefixSuffixClassName({ type: 'suffix' })}
        >
          {inlineSuffix}
        </InlinePrefixSuffixUI>
      )
    )
  }

  getSuffixMarkup() {
    const { suffix, seamless } = this.props

    return suffix && <InputSuffix isSeamless={seamless}>{suffix}</InputSuffix>
  }

  getActionMarkup() {
    const { action } = this.props

    return action && <InputSuffix isAction>{action}</InputSuffix>
  }

  getErrorMarkup() {
    const { errorIcon, errorMessage, state, tooltipAppendTo } = this.props
    const shouldRenderError = state === STATES.error

    if (!shouldRenderError) return null

    return (
      <InlinePrefixSuffixUI
        className={this.getInlinePrefixSuffixClassName({
          type: 'suffix',
          icon: true,
        })}
      >
        <Tooltip
          animationDelay={0}
          animationDuration={0}
          appendTo={tooltipAppendTo}
          closeOnContentClick={true}
          display="block"
          placement="top-end"
          title={errorMessage}
        >
          <Icon
            className="c-Input__errorIcon"
            name={errorIcon}
            size={24}
            state={STATES.error}
            tabIndex={-1}
          />
        </Tooltip>
      </InlinePrefixSuffixUI>
    )
  }

  getMultilineValue() {
    const { multiline } = this.props
    return typeof multiline === 'number' ? multiline : 1
  }

  getCharValidatorMarkup() {
    if (!this.props.withCharValidator) return null
    const { charValidatorLimit } = this.props
    const { value, isFocused, validatorCount } = this.state

    // shows validator green at 50% rounded down to the nearest 10th
    const charValidatorShowAt =
      Math.floor(charValidatorLimit / 2 / 10) * 10 || charValidatorLimit / 2
    const isTooMuch = validatorCount <= 0
    // shows validator yellow at 20% rounded down to the nearest 10th
    const isLessThanAFifth =
      validatorCount <=
      (Math.floor(charValidatorLimit / 5 / 10) * 10 || charValidatorLimit / 5)
    const isVisible =
      isFocused &&
      validatorCount <= charValidatorShowAt &&
      value.length >= validatorCount

    function getBadgeColor() {
      if (isTooMuch) {
        return 'error'
      } else if (isLessThanAFifth) {
        return 'warning'
      } else {
        return 'success'
      }
    }

    return (
      <CharValidatorUI>
        <Animate
          animateOnMount={true}
          duration={250}
          easing="bounce"
          in={isVisible}
          sequence="fade"
        >
          <Badge count={true} status={getBadgeColor()}>
            <CharValidatorText
              chars={this.state.validatorCount.toString().length}
            >
              {this.state.validatorCount}
            </CharValidatorText>
          </Badge>
        </Animate>
      </CharValidatorUI>
    )
  }

  getResizerMarkup() {
    const { multiline, offsetAmount, seamless } = this.props

    const { height, value } = this.state

    const resizer = !isNil(multiline) ? (
      <InputResizer
        contents={value}
        currentHeight={height}
        minimumLines={this.getMultilineValue()}
        offsetAmount={offsetAmount}
        onResize={this.handleExpandingResize}
        seamless={seamless}
      />
    ) : null

    return resizer
  }

  getInputMarkup = props => {
    const {
      autoFocus,
      charValidatorLimit,
      className,
      disabled,
      errorIcon,
      errorMessage,
      forceAutoFocusTimeout,
      helpText,
      hintText,
      inputRef,
      isFirst,
      isFocused,
      isLast,
      isNotOnly,
      isSubtleReadOnly,
      label,
      maxHeight,
      maxLength,
      moveCursorToEnd,
      multiline,
      name,
      offsetAmount,
      onBlur,
      onEnterDown,
      onEnterUp,
      onFocus,
      onResize,
      onScroll,
      onStartTyping,
      onStopTyping,
      onWheel,
      placeholder,
      prefix,
      readOnly,
      refApplyCallStopTyping,
      removeStateStylesOnFocus,
      resizable,
      scrollLock,
      seamless,
      size,
      state: stateProp,
      style: styleProp,
      suffix,
      tabIndex,
      type,
      typingThrottleInterval,
      typingTimeoutDelay,
      withCharValidator,
      withTypingEvent,
      ...rest
    } = this.props

    const { height, value, state } = this.state
    const isReadOnly = !isSubtleReadOnly && readOnly

    const fieldClassName = classNames(
      'c-Input__inputField',
      'c-InputField',
      maxHeight && 'has-maxHeight',
      multiline && 'is-multiline',
      isReadOnly && 'is-readonly',
      resizable && 'is-resizable',
      seamless && 'is-seamless',
      state && `is-${state}`,
      size && `is-${size}`
    )

    // Ignoring as height calculation isn't possible with JSDOM
    // (which is what Enzyme uses for tests)

    const style = multiline
      ? {
          height,
          maxHeight,
        }
      : null

    const id = props.id || this.state.id

    const BaseFieldComponent = multiline ? FieldTextAreaUI : FieldUI
    const componentProps = {
      ...getValidProps(rest),
      /* We manually set autoFocus after component mounts. */
      autoFocus: this.state.isFocused,
      className: fieldClassName,
      disabled,
      id,
      ref: this.setInputNodeRef,
      maxLength: withCharValidator ? charValidatorLimit : maxLength,
      name,
      onBlur: this.handleOnInputBlur,
      onChange: this.handleOnChange,
      onFocus: this.handleOnInputFocus,
      onKeyDown: this.handleOnKeyDown,
      onKeyUp: this.handleOnKeyUp,
      onWheel: this.handleOnWheel,
      placeholder,
      readOnly,
      style,
      tabIndex,
      type,
      value,
    }

    return <BaseFieldComponent {...componentProps} />
  }

  render() {
    const {
      className,
      disabled,
      isFirst,
      isNotOnly,
      isLast,
      isSubtleReadOnly,
      maxHeight,
      multiline,
      readOnly,
      resizable,
      seamless,
      style: styleProp,
      width,
    } = this.props
    const { isFocused, value, state } = this.state
    const isReadOnly = !isSubtleReadOnly && readOnly
    const componentClassName = classNames(
      'c-Input',
      disabled && 'is-disabled',
      isFocused && 'is-focused',
      maxHeight && 'has-maxHeight',
      multiline && 'is-multiline',
      isReadOnly && 'is-readonly',
      resizable && 'is-resizable',
      seamless && 'is-seamless',
      state && `is-${state}`,
      value && 'has-value',
      className
    )
    const componentStyle = {
      ...styleProp,
      maxWidth: width,
    }

    return (
      <FormLabelContext.Consumer>
        {props => (
          <InputWrapperUI className="c-InputWrapper" style={componentStyle}>
            {this.getLabelMarkup()}
            {this.getHelpTextMarkup()}
            <InputUI className={componentClassName}>
              {this.getPrefixMarkup()}
              {this.getInlinePrefixMarkup()}
              {this.getInputMarkup(props)}
              {this.getInlineSuffixMarkup()}
              {this.getErrorMarkup()}
              {this.getSuffixMarkup()}
              {this.getActionMarkup()}
              <InputBackdropV2
                className="c-Input__backdrop"
                disabled={disabled}
                isFirst={isFirst}
                isFocused={isFocused}
                isNotOnly={isNotOnly}
                isLast={isLast}
                readOnly={isReadOnly}
                isSeamless={seamless}
                state={state}
              />
              {this.getResizerMarkup()}
              {this.getCharValidatorMarkup()}
            </InputUI>
            {this.getHintTextMarkup()}
          </InputWrapperUI>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

Input.defaultProps = {
  autoFocus: false,
  charValidatorLimit: 500,
  'data-cy': 'Input',
  disabled: false,
  errorIcon: 'alert',
  forceAutoFocusTimeout: 0,
  hasInsertCarriageReturns: false,
  innerRef: noop,
  inputRef: noop,
  isFirst: false,
  isFocused: false,
  isLast: false,
  isNotOnly: false,
  isSubtleReadOnly: false,
  maxHeight: 320,
  maxLength: 524288,
  moveCursorToEnd: false,
  multiline: null,
  offsetAmount: 0,
  onBlur: noop,
  onChange: noop,
  onEnterDown: noop,
  onEnterUp: noop,
  onFocus: noop,
  onKeyDown: noop,
  onKeyUp: noop,
  onResize: noop,
  onStartTyping: noop,
  onStopTyping: noop,
  onWheel: noop,
  readOnly: false,
  refApplyCallStopTyping: noop,
  removeStateStylesOnFocus: false,
  resizable: false,
  scrollLock: false,
  seamless: false,
  style: {},
  tooltipAppendTo: document.body,
  type: 'text',
  typingThrottleInterval: 500,
  typingTimeoutDelay: 5000,
  value: '',
  withCharValidator: false,
  withTypingEvent: false,
}

Input.propTypes = {
  /** Embedded actions for the Input. */
  action: PropTypes.any,
  /** Automatically focuses the input. */
  autoFocus: PropTypes.bool,
  autoFocusTimeoutId: PropTypes.any,
  /** How many chars are allowed to be input. */
  charValidatorLimit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disable the input. */
  disabled: PropTypes.bool,
  /** Icon that renders when the state is `error`. */
  errorIcon: PropTypes.string,
  /** Error message that renders into a Tooltip. */
  errorMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Determines the amount of time (`ms`) for the component to focus on mount. */
  forceAutoFocusTimeout: PropTypes.number,
  /** If `true` and `enter + special` key is pressed, a return will be inserted */
  hasInsertCarriageReturns: PropTypes.bool,
  /** Displays text underneath input. */
  helpText: PropTypes.any,
  /** Displays text above input. */
  hintText: PropTypes.any,
  /** ID for the input. */
  id: PropTypes.string,
  /** Text or component (usually an Icon) to render before the input. */
  inlinePrefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Text or component (usually an Icon) to render after the input. */
  inlineSuffix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Retrieves the `input` DOM node. */
  inputRef: PropTypes.func,
  /** Helps render component without right borders. */
  isFirst: PropTypes.bool,
  /** Determines if the component is focused. */
  isFocused: PropTypes.bool,
  /** Helps render component without left borders. */
  isLast: PropTypes.bool,
  /** Helps render component without left/right borders. */
  isNotOnly: PropTypes.bool,
  /** Label for the input. */
  label: PropTypes.any,
  /** Sets the `max-height` for the input. Used with `multiline`. */
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Moves the selection cursor to the end, on focus. Default `false`. */
  moveCursorToEnd: PropTypes.bool,
  /** Transforms input into an auto-expanding textarea. */
  multiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /** Name for the input. */
  name: PropTypes.string,
  /** Number of characters to offset (bottom-right) for multiline resizing. */
  offsetAmount: PropTypes.number,
  /** Callback when input is blurred. */
  onBlur: PropTypes.func,
  /** Callback when input value is changed. */
  onChange: PropTypes.func,
  /** Callback when `Enter` is pressed down. */
  onEnterDown: PropTypes.func,
  /** Callback when `Enter` is pressed up. */
  onEnterUp: PropTypes.func,
  /** Callback when input is focused. */
  onFocus: PropTypes.func,
  /** Callback when input is resized. */
  onResize: PropTypes.func,
  /** Callback when user starts typing, rate limited by `typingThrottleInterval` */
  onStartTyping: PropTypes.func,
  /** Callback when user stops typing after delay of `typingTimeoutDelay`. */
  onStopTyping: PropTypes.func,
  /** Placeholder text for the input. */
  placeholder: PropTypes.string,
  /** Component to render before the input. */
  prefix: PropTypes.any,
  /** Disable editing of the input. */
  readOnly: PropTypes.bool,
  /** Exposes `CallStopTyping`, so that it can be called outside itself. */
  refApplyCallStopTyping: PropTypes.func,
  /** Removes the `state` styles on input focus. Default `false`. */
  removeStateStylesOnFocus: PropTypes.bool,
  /** Enables resizing for the textarea (only enabled for `multiline`). */
  resizable: PropTypes.bool,
  /** Enables scrollLock for component. Default `false`. */
  scrollLock: PropTypes.bool,
  /** Removes the border around the input. */
  seamless: PropTypes.bool,
  /** Determines the size of the input. */
  size: PropTypes.oneOf(['xs', 'xssm', 'sm', 'md', 'lg']),
  /** Change input to state color. */
  state: PropTypes.oneOf(['error', 'success', 'warning', '']),
  /** Component to render after the input. */
  suffix: PropTypes.any,
  /** Determines the input type. */
  inputType: PropTypes.string,
  /** The parent node where to mount the error message Tooltip component. */
  tooltipAppendTo: PropTypes.object,
  /** Determines the rate limiting interval for firing `onStartTyping`. */
  typingThrottleInterval: PropTypes.number,
  /** Determines the delay of when `onStopTyping` fires after typing stops. */
  typingTimeoutDelay: PropTypes.number,
  /** Initial value of the input. */
  value: PropTypes.any,
  /** Adds a char validator UI to the input. */
  withCharValidator: PropTypes.bool,
  /** Enables typing `onStartTyping` and `onStopTyping` event callbacks. */
  withTypingEvent: PropTypes.bool,
  innerRef: PropTypes.func,
  isSubtleReadOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  modalhelpText: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onScroll: PropTypes.func,
  onWheel: PropTypes.func,
  tabIndex: PropTypes.number,
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Input
