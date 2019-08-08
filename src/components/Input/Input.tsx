/* eslint react/no-deprecated: off */
import * as React from 'react'
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
import { namespaceComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { isDefined } from '../../utilities/is'
import { isModifierKeyPressed } from '../../utilities/keys'
import { noop, requestAnimationFrame } from '../../utilities/other'
import {
  COMPONENT_KEY,
  getTextAreaLineCurrent,
  getTextAreaLineTotal,
  moveCursorToEnd,
  isTextArea,
} from './Input.utils'
import {
  CharValidatorUI,
  InputWrapperUI,
  InlinePrefixSuffixUI,
  FieldUI,
  FieldTextAreaUI,
  InputUI,
} from './styles/Input.css'
import { InputProps, InputState, InputNode, InputEvent } from './Input.types'

const uniqueID = createUniqueIDFactory('Input')

export class Input extends React.PureComponent<InputProps, InputState> {
  static defaultProps = {
    autoFocus: false,
    charValidatorShowAt: 0,
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

  computedStyles: Object | any
  inputNode: InputNode | null

  constructor(props: InputProps) {
    super(props)

    this.state = {
      charValidatorText: '',
      id: props.id || uniqueID(),
      isFocused: props.isFocused,
      state: props.state,
      typingThrottle: undefined,
      typingTimeout: undefined,
      value: props.value,
    }
  }

  componentDidMount() {
    this.maybeForceAutoFocus()
    this.props.withTypingEvent &&
      this.props.refApplyCallStopTyping(this.callStopTyping.bind(this))
  }

  componentWillReceiveProps(nextProps: InputProps) {
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
  }

  setValue = value => {
    const { inputType } = this.props
    let nextValue = value

    if (inputType === 'number') {
      nextValue = value.replace(/\D/g, '')
    }

    this.setState({ value: nextValue })
    return nextValue
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

    setTimeout(() => {
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
    // TODO: fix typescript complains
    // @ts-ignore
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
    // TODO: fix typescript complains
    // @ts-ignore
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

  handleOnChange = (event: InputEvent) => {
    if (this.props.withTypingEvent) this.typingEvent()
    // TODO: fix typescript complains
    // @ts-ignore
    const value = event.currentTarget.value
    const nextValue = this.setValue(value)
    this.props.onChange(nextValue)
  }

  handleOnInputBlur = (event: InputEvent) => {
    this.setState({
      isFocused: false,
    })
    this.props.onBlur(event)
  }

  handleOnInputFocus = (event: InputEvent) => {
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

  handleOnWheel = (event: WheelEvent) => {
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
      cursorIndex == 0 && nextValue.length === 0 && prevValue.length === 0

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
      // TODO: fix typescript complains
      // @ts-ignore
      this.inputNode.setSelectionRange(cursorIndex + 1, cursorIndex + 1)
    })
  }

  handleOnKeyDown = (event: Event) => {
    const { hasInsertCarriageReturns } = this.props

    // TODO: fix typescript complains
    // @ts-ignore
    if (event.keyCode === Keys.ENTER) {
      this.props.onEnterDown(event)
    }

    // TODO: fix typescript complains
    // @ts-ignore
    if (hasInsertCarriageReturns && event.keyCode === Keys.ENTER) {
      this.insertCarriageReturnAtCursorIndex(event)
    }

    this.props.onKeyDown(event)
    this.scrollToBottom()
  }

  handleOnKeyUp = (event: Event) => {
    // TODO: fix typescript complains
    // @ts-ignore
    if (event.keyCode === Keys.ENTER) {
      this.props.onEnterUp(event)
    }
    this.props.onKeyUp(event)
  }

  handleExpandingResize = (height: number) => {
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
      // TODO: fix typescript complains
      // @ts-ignore
      moveCursorToEnd(this.inputNode)
    })
  }

  setInputNodeRef = (node: InputNode) => {
    this.inputNode = node
    this.props.inputRef(node)
    this.props.innerRef(node)
  }

  // Assumption: The padding-bottom does not change after the component is
  // rendered.
  setComputedStylesFromHeight = (height: number) => {
    if (!height) return
    if (this.computedStyles) return
    if (!this.inputNode) return

    const computedStyles = window.getComputedStyle(this.inputNode)

    const { paddingBottom } = computedStyles
    this.computedStyles = {
      // TODO: fix typescript complains
      // @ts-ignore
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
  getInlinePrefixSuffixClassName({ type, icon }: any) {
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
    const { errorIcon, errorMessage, state } = this.props
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
    const { charValidatorLimit, charValidatorShowAt } = this.props
    const {
      value: { length: count },
    } = this.state
    const isVisible =
      charValidatorShowAt === 0 || (count > 0 && count >= charValidatorShowAt)
    const currentCount = charValidatorLimit - count
    const isTooMuch = count !== 0 && count >= charValidatorLimit
    const nextText = isVisible && `${count} / ${charValidatorLimit}`

    return (
      <CharValidatorUI>
        <Animate
          animateOnMount={true}
          duration={250}
          easing="bounce"
          in={isVisible}
          sequence="fade"
          unmountOnExit
        >
          {nextText ? (
            <Badge
              status={isTooMuch ? 'error' : 'success'}
              style={{ minWidth: 75, fontWeight: 100 }}
            >
              {nextText ? nextText : null}
            </Badge>
          ) : null}
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

  getInputMarkup = (props: any) => {
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
      innerRef: this.setInputNodeRef,
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
        {(props: Object) => (
          <InputWrapperUI className="c-InputWrapper" style={componentStyle}>
            {this.getLabelMarkup()}
            {this.getHelpTextMarkup()}
            <InputUI className={componentClassName}>
              {this.getPrefixMarkup()}
              {this.getInlinePrefixMarkup()}
              {this.getInputMarkup(props)}
              {this.getInlineSuffixMarkup()}
              {this.getSuffixMarkup()}
              {this.getErrorMarkup()}
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

namespaceComponent(COMPONENT_KEY.Input)(Input)

export default Input
