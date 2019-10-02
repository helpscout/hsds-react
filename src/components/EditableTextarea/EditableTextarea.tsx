import * as React from 'react'

import Textarea from 'react-textarea-autosize'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import debounce from '../../utilities/debounce'
import * as equal from 'fast-deep-equal'

import { ComponentUI, EditableTextareaUI } from './styles/EditableTextarea.css'
import { LabelTextUI } from '../EditableField/styles/EditableField.css'

import { COMPONENT_KEY } from './EditableTextarea.utils'
import { key } from '../../constants/Keys'
import { CAUSE, OPERATION } from '../EditableField/constants'

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
    id: 'editabletextarea',
    innerRef: noop,
    maxRows: 5,
    placeholder: 'Enter your notes',
    value: '',
    onCommit: noop,
    onChange: noop,
    onEnter: noop,
    onEscape: noop,
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
  editableTextareaRef: HTMLDivElement

  setEditableTextareaNode = node => {
    this.editableTextareaRef = node
    this.props.innerRef(node)
  }

  getClassName() {
    const { className } = this.props

    return classNames(EditableTextarea.className, className)
  }
  /* istanbul ignore next */
  componentDidMount() {
    this.textArea.current.addEventListener('scroll', this.debouncedScroll)
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    this.textArea.current.removeEventListener('scroll', this.debouncedScroll)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === this.props.value) return

    // Tested
    /* istanbul ignore next */ if (nextProps.value === this.state.value) return

    this.setState({
      value: nextProps.value,
    })
  }

  /* istanbul ignore next */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setClampVisualCue()
    }
    if (this.state.value !== prevState.value) {
      this.setClampVisualCue()
    }
  }

  /* istanbul ignore next */
  detectScroll = e => {
    // If the user scrolls to the bottom, remove the visual clamp cue
    const hasReachedBottom =
      this.textArea.current.clientHeight + this.textArea.current.scrollTop >=
      this.textArea.current.scrollHeight

    this.setState({ clamped: !hasReachedBottom })
  }

  handleOnBlur = e => {
    const { id, onCommit } = this.props
    const { value } = this.state
    const item = {
      value,
      id,
    }

    this.setState(
      {
        readOnly: true,
      },
      () => {
        onCommit({
          data: {
            cause: CAUSE.BLUR,
            operation: OPERATION.UPDATE,
            item,
          },
          name: id,
          value: [item],
        })
        /* istanbul ignore next */
        this.textArea.current.scrollTo &&
          this.textArea.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
    )
  }

  handleOnChange = e => {
    this.setState(
      {
        value: e.target.value,
      },
      () => {
        const { id } = this.props
        const { value } = this.state
        const item = {
          value,
          id,
        }
        this.props.onChange({
          name: id,
          value: [item],
          event: e,
        })
      }
    )
  }

  handleOnClick = () => {
    /* istanbul ignore else */
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

    /* istanbul ignore next */
    const stop = () => e.preventDefault() && e.stopPropagation()

    // Escape route tested
    /* istanbul ignore else */
    if (!isShiftPressed && code === key.ENTER) {
      stop()

      this.setState(
        {
          value: this.state.value.trim(),
        },
        () => {
          const { id } = this.props
          const { value } = this.state
          const item = {
            value,
            id,
          }
          this.props.onEnter({
            name: id,
            value: [item],
            event: e,
          })
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
          const { id } = this.props
          const { value } = this.state
          const item = {
            value,
            id,
          }
          this.props.onEscape({
            name: id,
            value: [item],
            event: e,
          })
          this.textArea.current.blur()
        }
      )
    }
  }

  /* istanbul ignore next */
  handleTextareaHeightChange = () => {
    this.setClampVisualCue()
  }

  /* istanbul ignore next */
  setClampVisualCue = () => {
    this.setState({
      clamped:
        Boolean(this.state.value) &&
        this.textArea.current.clientHeight > 0 &&
        this.textArea.current.clientHeight < this.textArea.current.scrollHeight,
    })
  }

  render() {
    const { id, maxRows, placeholder, ...rest } = this.props
    const { clamped, readOnly, value } = this.state

    return (
      <ComponentUI
        innerRef={this.setEditableTextareaNode}
        className={this.getClassName()}
      >
        <label className="EditableTextarea__label" htmlFor={id}>
          <LabelTextUI>Notes</LabelTextUI>
        </label>
        <EditableTextareaUI
          className={classNames(
            'EditableTextarea__ResizableTextarea',
            readOnly && 'is-readonly',
            /* istanbul ignore next */ readOnly && clamped && 'is-clamped',
            !Boolean(value) && 'with-placeholder'
          )}
        >
          <Textarea
            {...getValidProps(rest)}
            id={id}
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
