// @flow
/* eslint react/no-deprecated: off */
import type { UISize, UIState } from '../../constants/types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import FormLabelContext from '../FormLabel/Context'
import AddOn from './AddOn'
import Backdrop from './BackdropV2'
import Prefix from './Prefix'
import Resizer from './Resizer'
import Static from './Static'
import Suffix from './Suffix'
import HelpText from '../HelpText'
import Icon from '../Icon'
import Label from '../Label'
import { scrollLockY } from '../ScrollLock/ScrollLock.utils'
import Tooltip from '../Tooltip'
import { STATES } from '../../constants/index'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { isDefined } from '../../utilities/is'
import { noop, requestAnimationFrame } from '../../utilities/other'
import { ScopeProvider } from '../styled'
import {
  COMPONENT_KEY,
  getTextAreaLineCurrent,
  getTextAreaLineTotal,
  moveCursorToEnd,
  isTextArea,
} from './utils'
import {
  InputWrapperUI,
  InlinePrefixSuffixUI,
  FieldUI,
  FieldTextAreaUI,
  InputUI,
} from './styles/Input.css.js'

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
  errorMessage?: string,
  errorIcon?: string,
  helpText: any,
  hintText: any,
  id: string,
  inlinePrefix?: string,
  inlineSuffix?: string,
  inputRef: (ref: HTMLElement) => void,
  innerRef: (ref: HTMLElement) => void,
  isFocused: boolean,
  isFirst: boolean,
  isNotOnly: boolean,
  isLast: boolean,
  isSubtleReadOnly: boolean,
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
  onKeyDown: (event: AnyInputEvent) => void,
  onResize: (height: number) => void,
  onWheel: (event: AnyInputEvent) => void,
  onStartTyping: (now?: number) => void,
  onStopTyping: () => void,
  placeholder: string,
  prefix: any,
  readOnly: boolean,
  refApplyCallStopTyping: (fn: () => void) => void,
  removeStateStylesOnFocus: boolean,
  resizable: boolean,
  seamless: boolean,
  scrollLock: boolean,
  size: UISize,
  state?: ?UIState,
  style: Object,
  suffix: any,
  type: string,
  typingThrottleInterval: number,
  typingTimeoutDelay: number,
  value: InputValue,
  withTypingEvent: false,
}

type State = {
  id: string,
  isFocused: boolean,
  height: ?number,
  state: ?UIState,
  typingThrottle: ?IntervalID,
  typingTimeout: ?TimeoutID,
  value: InputValue,
}

export class Input extends Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    errorIcon: 'alert',
    forceAutoFocusTimeout: 0,
    inputRef: noop,
    innerRef: noop,
    isFocused: false,
    isFirst: false,
    isNotOnly: false,
    isLast: false,
    isSubtleReadOnly: false,
    moveCursorToEnd: false,
    multiline: null,
    offsetAmount: 0,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onKeyDown: noop,
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
    type: 'text',
    typingThrottleInterval: 500,
    typingTimeoutDelay: 5000,
    value: '',
    withTypingEvent: false,
  }

  static AddOn = AddOn
  static Backdrop = Backdrop
  static Prefix = Prefix
  static Resizer = Resizer
  static Static = Static
  static Suffix = Suffix

  computedStyles: Object
  inputNode: InputNode

  constructor(props: Props) {
    super(props)
    this.state = {
      id: props.id || uniqueID(),
      isFocused: props.isFocused,
      height: null,
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
    // $FlowFixMe
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

    this.setState({
      isFocused: true,
    })

    setTimeout(() => {
      /* istanbul ignore else */
      if (this.inputNode) {
        this.inputNode.focus()
      }
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

  handleOnChange = (event: InputEvent) => {
    if (this.props.withTypingEvent) this.typingEvent()
    const value = event.currentTarget.value
    this.setState({ value })
    this.props.onChange(value)
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

  handleOnKeyDown = (event: Event) => {
    this.props.onKeyDown(event)
    this.scrollToBottom()
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
      paddingBottom: parseInt(paddingBottom, 10),
    }
  }

  getHelpTextMarkup() {
    const { helpText } = this.props

    return (
      helpText && <HelpText className="c-Input__helpText">{helpText}</HelpText>
    )
  }

  getHintTextMarkup() {
    const { hintText } = this.props

    return (
      hintText && (
        <HelpText className="c-Input__hintText" isCompact>
          {hintText}
        </HelpText>
      )
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

    return (
      prefix && (
        <Prefix className="c-Input__item c-Input__prefix" isSeamless={seamless}>
          {prefix}
        </Prefix>
      )
    )
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

    return (
      suffix && (
        <Suffix className="c-Input__item c-Input__suffix" isSeamless={seamless}>
          {suffix}
        </Suffix>
      )
    )
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
            name={errorIcon}
            state={STATES.error}
            className="c-Input__errorIcon"
          />
        </Tooltip>
      </InlinePrefixSuffixUI>
    )
  }

  getMultilineValue() {
    const { multiline } = this.props
    return typeof multiline === 'number' ? multiline : 1
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
      className,
      disabled,
      errorIcon,
      errorMessage,
      forceAutoFocusTimeout,
      helpText,
      hintText,
      inputRef,
      isFocused,
      isFirst,
      isNotOnly,
      isLast,
      isSubtleReadOnly,
      label,
      maxHeight,
      moveCursorToEnd,
      multiline,
      name,
      offsetAmount,
      onBlur,
      onFocus,
      onResize,
      onStartTyping,
      onStopTyping,
      onWheel,
      onScroll,
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
      typingThrottleInterval,
      typingTimeoutDelay,
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
      autoFocus,
      className: fieldClassName,
      id,
      onChange: this.handleOnChange,
      onKeyDown: this.handleOnKeyDown,
      innerRef: this.setInputNodeRef,
      disabled,
      name,
      onBlur: this.handleOnInputBlur,
      onFocus: this.handleOnInputFocus,
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

    return (
      <ScopeProvider scope="html">
        <FormLabelContext.Consumer>
          {(props: Object) => (
            <InputWrapperUI className="c-InputWrapper" style={styleProp}>
              {this.getLabelMarkup()}
              {this.getHelpTextMarkup()}
              <InputUI className={componentClassName}>
                {this.getPrefixMarkup()}
                {this.getInlinePrefixMarkup()}
                {this.getInputMarkup(props)}
                {this.getInlineSuffixMarkup()}
                {this.getSuffixMarkup()}
                {this.getErrorMarkup()}
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
              </InputUI>
              {this.getHintTextMarkup()}
            </InputWrapperUI>
          )}
        </FormLabelContext.Consumer>
      </ScopeProvider>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Input)(Input)

export default Input
