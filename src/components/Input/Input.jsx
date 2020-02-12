/* eslint react/no-deprecated: off */
import React from 'react'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import Badge from '../Badge'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import FormLabelContext from '../FormLabel/Context'
import AddOn from './Input.AddOn'
import Backdrop from './Input.BackdropV2'
import Prefix from './Input.Prefix'
import Resizer from './Input.Resizer'
import Static from './Input.Static'
import Suffix from './Input.Suffix'
import HelpText from '../HelpText'
import Icon from '../Icon'
import Label from '../Label'
import { scrollLockY } from '../ScrollLock/ScrollLock.utils'
import Tooltip from '../Tooltip'
import { STATES } from '../../constants'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { isModifierKeyPressed } from '../../utilities/keys'
import { isDefined } from '../../utilities/is'
import { noop, requestAnimationFrame } from '../../utilities/other'
import {
  getTextAreaLineCurrent,
  getTextAreaLineTotal,
  moveCursorToEnd,
  isTextArea,
} from './Input.utils'
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

export class Input extends React.PureComponent {
  static propTypes = {
    action: PropTypes.any,
    autoFocus: PropTypes.bool,
    autoFocusTimeoutId: PropTypes.any,
    charValidatorLimit: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    errorIcon: PropTypes.string,
    errorMessage: PropTypes.string,
    forceAutoFocusTimeout: PropTypes.number,
    hasInsertCarriageReturns: PropTypes.bool,
    helpText: PropTypes.any,
    hintText: PropTypes.any,
    id: PropTypes.string,
    inlinePrefix: PropTypes.string,
    inlineSuffix: PropTypes.string,
    innerRef: PropTypes.func,
    inputRef: PropTypes.func,
    inputType: PropTypes.string,
    isFirst: PropTypes.bool,
    isFocused: PropTypes.bool,
    isLast: PropTypes.bool,
    isNotOnly: PropTypes.bool,
    isSubtleReadOnly: PropTypes.bool,
    label: PropTypes.any,
    maxLength: PropTypes.number,
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    modalhelpText: PropTypes.string,
    moveCursorToEnd: PropTypes.bool,
    multiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    name: PropTypes.string,
    offsetAmount: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onEnterDown: PropTypes.func,
    onEnterUp: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onScroll: PropTypes.func,
    onResize: PropTypes.func,
    onStartTyping: PropTypes.func,
    onStopTyping: PropTypes.func,
    onWheel: PropTypes.func,
    placeholder: PropTypes.string,
    prefix: PropTypes.any,
    readOnly: PropTypes.bool,
    refApplyCallStopTyping: PropTypes.func,
    removeStateStylesOnFocus: PropTypes.bool,
    resizable: PropTypes.bool,
    scrollLock: PropTypes.bool,
    seamless: PropTypes.bool,
    size: PropTypes.string,
    state: PropTypes.string,
    style: PropTypes.any,
    suffix: PropTypes.any,
    tabIndex: PropTypes.number,
    type: PropTypes.string,
    typingThrottleInterval: PropTypes.number,
    typingTimeoutDelay: PropTypes.number,
    value: PropTypes.any,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    withCharValidator: PropTypes.bool,
    withTypingEvent: PropTypes.bool,
  }

  static defaultProps = {
    autoFocus: false,
    charValidatorLimit: 500,
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
    state: '',
    style: {},
    type: 'text',
    typingThrottleInterval: 500,
    typingTimeoutDelay: 5000,
    value: '',
    withCharValidator: false,
    withTypingEvent: false,
  }

  static AddOn = AddOn
  static Backdrop = Backdrop
  static Prefix = Prefix
  static Resizer = Resizer
  static Static = Static
  static Suffix = Suffix

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
      /* istanbul ignore else */
      if (this.inputNode) {
        this.inputNode.focus()
      }

      this.setState({
        isFocused: true,
      })
    }, forceAutoFocusTimeout)
  }

  // JSDOM does not provide the necessary values to test this method.
  // Mocking it would also be extremely difficult and brittle.

  /* istanbul ignore next */
  scrollToBottom() {
    if (!this.props.multiline) return
    if (!this.inputNode || !isTextArea(this.inputNode)) return
    if (!isDefined(this.computedStyles.paddingBottom)) return

    const { scrollTop, clientHeight } = this.inputNode

    const currentLine = getTextAreaLineCurrent(this.inputNode)
    const totalLines = getTextAreaLineTotal(this.inputNode)
    const isLastLine = currentLine === totalLines

    const scrollBottom =
      scrollTop + clientHeight + this.computedStyles.paddingBottom

    if (isLastLine) {
      requestAnimationFrame(() => {
        if (this.inputNode && this.inputNode.scrollTo) {
          this.inputNode.scrollTo(0, scrollBottom)
        }
      })
    }
  }

  callStartTyping() {
    /* istanbul ignore next */
    if (this.props.onStartTyping) {
      this.props.onStartTyping()
      this.setThrottler()
    }
  }

  callStopTyping() {
    /* istanbul ignore next */
    if (this.state.typingTimeout) {
      this.clearThrottler()
      this.props.onStopTyping()
      this.clearTypingTimeout()
    }
  }

  clearTypingTimeout() {
    /* istanbul ignore next */
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
    /* istanbul ignore next */
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

    /* istanbul ignore if */
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
    this.scrollToBottom()
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
    /* istanbul ignore next */
    // Not reliably testable in JSDOM + Enzyme
    if (
      !this.props.moveCursorToEnd ||
      !this.inputNode ||
      !isTextArea(this.inputNode)
    )
      return
    /* istanbul ignore next */
    requestAnimationFrame(() => {
      /* istanbul ignore next */

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

  /* istanbul ignore next */
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

    return prefix && <Prefix isSeamless={seamless}>{prefix}</Prefix>
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

    return suffix && <Suffix isSeamless={seamless}>{suffix}</Suffix>
  }

  getActionMarkup() {
    const { action } = this.props

    return action && <Suffix isAction>{action}</Suffix>
  }

  getErrorMarkup() {
    const { errorIcon, errorMessage, state, tabIndex = 0 } = this.props
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
          display="block"
          placement="top-end"
          title={errorMessage}
        >
          <Icon
            className="c-Input__errorIcon"
            name={errorIcon}
            size={24}
            state={STATES.error}
            tabIndex={tabIndex}
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

    const resizer =
      multiline != null ? (
        <Resizer
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
    /* istanbul ignore next */
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
              <Backdrop
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

export default Input