// @flow
import React, { PureComponent as Component } from 'react'
import Backdrop from './Backdrop'
import Resizer from './Resizer'
import Static from './Static'
import HelpText from '../HelpText'
import Label from '../Label'
import { scrollLockY } from '../ScrollLock'
import Keys from '../../constants/Keys'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop, requestAnimationFrame } from '../../utilities/other'
import {
  getTextAreaLineCurrent,
  getTextAreaLineTotal,
  moveCursorToEnd,
  isTextArea,
} from './helpers'
import type { UISize, UIState } from '../../constants/types'

const uniqueID = createUniqueIDFactory('Input')

type InputNode = HTMLInputElement | HTMLTextAreaElement
type InputEvent = SyntheticEvent<InputNode>
type WheelEvent = SyntheticWheelEvent<InputNode>
type AnyInputEvent = InputEvent | WheelEvent | Event
type InputValue = string

type Props = {
  autoFocus: boolean,
  className: string,
  disabled: boolean,
  forceAutoFocusTimeout: number,
  helpText: any,
  hintText: any,
  id: string,
  inputRef: (ref: HTMLElement) => void,
  isFocused: boolean,
  label: any,
  modalhelpText: string,
  moveCursorToEnd: boolean,
  multiline: boolean | number,
  maxHeight: number | string,
  name: string,
  offsetAmount: number,
  onBlur: (event: AnyInputEvent) => void,
  onChange: (value: InputValue) => void,
  onFocus: (event: AnyInputEvent) => void,
  onWheel: (event: AnyInputEvent) => void,
  onStartTyping: (event: Event) => void,
  onStopTyping: (event: Event) => void,
  placeholder: string,
  prefix: string,
  readOnly: boolean,
  refApplyCallStopTyping: (event: SubmitEvent) => void,
  removeStateStylesOnFocus: boolean,
  resizable: boolean,
  seamless: boolean,
  scrollLock: boolean,
  size: UISize,
  state?: ?UIState,
  style: Object,
  suffix: string,
  type: string,
  typingTimeoutDelay: number,
  value: InputValue,
  withTypingEvent: false,
}

type State = {
  id: string,
  height: ?number,
  state: ?UIState,
  value: InputValue,
}

class Input extends Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    forceAutoFocusTimeout: 0,
    inputRef: noop,
    isFocused: false,
    moveCursorToEnd: false,
    multiline: null,
    offsetAmount: 0,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
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
    type: 'text',
    typingTimeoutDelay: 5000,
    value: '',
    withTypingEvent: false,
  }
  static Backdrop = Backdrop
  static Resizer = Resizer
  static Static = Static
  inputNode: InputNode

  constructor(props: Props) {
    super()
    this.state = {
      id: props.id || uniqueID(),
      height: null,
      state: props.state,
      typingTimeout: null,
      value: props.value,
    }
  }

  componentDidMount() {
    this.maybeForceAutoFocus()
    this.props.withTypingEvent &&
      this.props.refApplyCallStopTyping(this.callStopTyping.bind(this))
  }

  componentWillReceiveProps(nextProps: Props) {
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
    this.props.withTypingEvent && this.clearTypingTimeout()
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
    }, forceAutoFocusTimeout)
  }

  scrollToBottom() {
    /* istanbul ignore next */
    if (!this.props.multiline || !this.inputNode || !isTextArea(this.inputNode))
      return
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
      // $FlowFixMe
      this.inputNode.scrollTo(0, this.inputNode.scrollHeight)
    }
  }

  callStartTyping(now) {
    this.props.onStartTyping()
    this.setTypingTimeout(now)
  }

  callStopTyping() {
    /* istanbul ignore next */
    if (this.state.typingTimeout) {
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

  setTypingTimeout(now) {
    this.setState({
      typingTimeout: setTimeout(
        this.callStopTyping.bind(this),
        this.props.typingTimeoutDelay
      ),
      typingStartTime: now,
    })
  }

  typingEvent() {
    const now = Date.now()
    if (!this.state.typingTimeout) {
      this.callStartTyping(now)
    } else {
      this.clearTypingTimeout()
      this.setTypingTimeout(now)
    }
  }

  handleOnChange = (event: Event) => {
    if (this.props.withTypingEvent) this.typingEvent()
    const value = event.currentTarget.value
    this.setState({ value })
    this.props.onChange(value)
    this.scrollToBottom()
  }

  handleOnInputFocus = (event: InputEvent) => {
    const { onFocus, removeStateStylesOnFocus } = this.props
    const { state } = this.state
    if (removeStateStylesOnFocus && state) {
      this.setState({ state: null })
    }
    this.moveCursorToEnd()
    onFocus(event)
  }

  handleOnWheel = (event: SyntheticWheelEvent<InputNode>) => {
    const { multiline, onWheel, scrollLock } = this.props
    if (!multiline || !scrollLock) return

    const stopPropagation = true
    scrollLockY(event, stopPropagation)
    onWheel(event)
  }

  handleExpandingResize = (height: number) => {
    this.setState({ height })
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

  setInputNodeRef = (node: InputNode) => {
    this.inputNode = node
    this.props.inputRef(node)
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
      moveCursorToEnd,
      multiline,
      name,
      offsetAmount,
      onBlur,
      onFocus,
      onStartTyping,
      onStopTyping,
      onWheel,
      placeholder,
      prefix,
      readOnly,
      refApplyCallStopTyping,
      removeStateStylesOnFocus,
      resizable,
      seamless,
      scrollLock,
      size,
      state: stateProp,
      style: styleProp,
      suffix,
      type,
      typingTimeoutDelay,
      withTypingEvent,
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
          contents={value}
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
      autoFocus,
      className: fieldClassName,
      id: inputID,
      onChange: handleOnChange,
      ref: this.setInputNodeRef,
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

export default Input
