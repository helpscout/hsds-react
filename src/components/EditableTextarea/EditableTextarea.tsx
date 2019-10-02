import * as React from 'react'

import Textarea from 'react-textarea-autosize'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import debounce from '../../utilities/debounce'
import { ComponentUI, EditableTextareaUI } from './styles/EditableTextarea.css'
import { LabelTextUI } from '../EditableField/styles/EditableField.css'

import { COMPONENT_KEY } from './EditableTextarea.utils'
import { key } from '../../constants/Keys'

import {
  EditableTextareaProps,
  EditableTextareaState,
} from './EditableTextarea.types'

export class EditableTextarea extends React.PureComponent<
  EditableTextareaProps,
  EditableTextareaState
> {
  static className = 'c-EditableTextarea'
  static defaultProps = {
    innerRef: noop,
    maxRows: 5,
    placeholder: 'Enter your notes',
    value: '',
  }

  constructor(props) {
    super(props)

    const valueFromProps = props.value && props.value.trim()

    this.state = {
      clamped: false,
      readOnly: true,
      prevValue: valueFromProps,
      value: valueFromProps,
    }

    this.textArea = React.createRef()
    this.debouncedScroll = debounce(this.detectScroll, 50)
  }

  textArea: any
  debouncedScroll: any

  getClassName() {
    const { className } = this.props
    const { clamped, readOnly, value } = this.state

    return classNames(
      EditableTextarea.className,
      readOnly && 'is-readonly',
      readOnly && clamped && 'is-clamped',
      !Boolean(value) && 'with-placeholder',
      className
    )
  }

  componentDidMount() {
    this.textArea.current.addEventListener('scroll', this.debouncedScroll)
  }

  componentWillUnmount() {
    this.textArea.current.removeEventListener('scroll', this.debouncedScroll)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setClampVisualCue()
    }
    if (this.state.value !== prevState.value) {
      this.setClampVisualCue()
    }
  }

  detectScroll = e => {
    // If the user scrolls to the bottom, remove the visual clamp cue
    if (
      this.textArea.current.clientHeight + this.textArea.current.scrollTop >=
      this.textArea.current.scrollHeight
    ) {
      this.setState({ clamped: false })
    } else {
      this.setState({ clamped: true })
    }
  }

  handleOnBlur = e => {
    this.setState(
      {
        readOnly: true,
      },
      () => {
        this.textArea.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
    )
  }

  handleOnChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  handleOnClick = e => {
    if (this.state.readOnly) {
      this.setState({
        prevValue: this.textArea.current.value,
        readOnly: false,
      })
    }
  }

  handleOnKeyDown = e => {
    const code = e.key
    const isShiftPressed = e.shiftKey

    const stop = () => e.preventDefault() && e.stopPropagation()

    if (!isShiftPressed && code === key.ENTER) {
      stop()
      this.setState(
        {
          value: this.state.value.trim(),
        },
        () => {
          this.textArea.current.blur()
        }
      )
    } else if (code === key.ESCAPE) {
      stop()
      this.setState(
        {
          value: this.state.prevValue,
        },
        () => {
          this.textArea.current.blur()
        }
      )
    }
  }

  handleTextareaHeightChange = () => {
    this.setClampVisualCue()
  }

  setClampVisualCue = () => {
    this.setState({
      clamped:
        Boolean(this.state.value) &&
        this.textArea.current.clientHeight > 0 &&
        this.textArea.current.clientHeight < this.textArea.current.scrollHeight,
    })
  }

  render() {
    const { maxRows, placeholder } = this.props
    const { readOnly, value, ...rest } = this.state

    return (
      <ComponentUI>
        <LabelTextUI>Notes</LabelTextUI>
        <EditableTextareaUI className={this.getClassName()}>
          <Textarea
            {...getValidProps(rest)}
            inputRef={this.textArea}
            onBlur={this.handleOnBlur}
            onChange={this.handleOnChange}
            onClick={this.handleOnClick}
            onKeyDown={this.handleOnKeyDown}
            placeholder={placeholder}
            readOnly={readOnly}
            value={value}
            maxRows={maxRows}
            onHeightChange={this.handleTextareaHeightChange}
          />
        </EditableTextareaUI>
      </ComponentUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableTextarea)

export default PropConnectedComponent
