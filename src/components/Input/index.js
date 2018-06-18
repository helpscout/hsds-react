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
} from './helpers'
import type { UISizes, UIStates } from '../../constants/types'

const uniqueID = createUniqueIDFactory('Input')

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
  onBlur: (event: Event) => void,
  onChange: (event: Event) => void,
  onFocus: (event: Event) => void,
  onWheel: (event: Event) => void,
  placeholder: string,
  prefix: string,
  readOnly: boolean,
  removeStateStylesOnFocus: boolean,
  resizable: boolean,
  seamless: boolean,
  scrollLock: boolean,
  size: UISizes,
  state?: ?UIStates,
  style: Object,
  suffix: string,
  type: string,
  value: string,
}

type State = {
  id: string,
  height: number | null,
  state: string | null,
  value: string,
}

type InputNode = HTMLInputElement | HTMLTextAreaElement

class Input extends Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    forceAutoFocusTimeout: 0,
    inputRef: noop,
    isFocused: false,
    moveCursorToEnd: true,
    multiline: null,
    offsetAmount: 0,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onWheel: noop,
    readOnly: false,
    removeStateStylesOnFocus: false,
    resizable: false,
    scrollLock: false,
    seamless: false,
    state: '',
    type: 'text',
    value: '',
  }
  static Backdrop = Backdrop
  static Resizer = Resizer
  static Static = Static
  inputNode: ?InputNode

  constructor(props: Props) {
    super()
    this.state = {
      id: props.id || uniqueID(),
      height: null,
      state: props.state,
      value: props.value,
    }
  }

  componentDidMount() {
    this.maybeForceAutoFocus()
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
    if (!this.props.multiline || !this.inputNode || !this.inputNode.scrollTo)
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
      this.inputNode.scrollTo(0, this.inputNode.scrollHeight)
    }
  }

  handleOnChange = (event: Event) => {
    const value = event.currentTarget.value
    this.setState({ value })
    this.props.onChange(value)
    this.scrollToBottom()
  }

  handleOnInputFocus = (event: Event) => {
    const { onFocus, removeStateStylesOnFocus } = this.props
    const { state } = this.state
    if (removeStateStylesOnFocus && state) {
      this.setState({ state: null })
    }
    this.moveCursorToEnd()
    onFocus(event)
  }

  handleOnWheel = (event: WheelEvent) => {
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
    if (!this.inputNode || !this.props.moveCursorToEnd) return
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
      onWheel,
      placeholder,
      prefix,
      readOnly,
      removeStateStylesOnFocus,
      resizable,
      seamless,
      scrollLock,
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
