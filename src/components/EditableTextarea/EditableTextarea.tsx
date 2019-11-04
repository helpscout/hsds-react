import * as React from 'react'

import Textarea from 'react-textarea-autosize'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import debounce from '../../utilities/debounce'

import {
  ComponentUI,
  EditableTextareaUI,
  MaskUI,
} from './styles/EditableTextarea.css'
import { LabelTextUI } from '../EditableField/styles/EditableField.css'
import { ValidationIconUI } from '../EditableField/styles/EditableField.Input.css'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

import { COMPONENT_KEY, scrollToTop } from './EditableTextarea.utils'
import { key } from '../../constants/Keys'
import { CAUSE, OPERATION } from '../EditableField/constants'
import { getValidationColor } from '../EditableField/EditableField.utils'

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
    floatingLabels: false,
    id: 'editabletextarea',
    innerRef: noop,
    label: 'Notes',
    maxRows: 5,
    overflowCueColor: 'white',
    placeholder: 'Add notes',
    value: '',
    onCommit: noop,
    onChange: noop,
    onInputBlur: noop,
    onInputFocus: noop,
    onEnter: noop,
    onEscape: noop,
    validate: () => Promise.resolve({ isValid: true }),
  }

  constructor(props) {
    super(props)

    const valueFromProps = props.value && props.value.trim()

    this.state = {
      clamped: false,
      readOnly: true,
      prevValue: valueFromProps,
      value: valueFromProps,
      validated: false,
      validationInfo: null,
    }

    this.textArea = React.createRef()
    this.debouncedScroll = debounce(this.detectScroll, 30)
  }

  textArea: any
  debouncedScroll: any
  editableTextareaRef: HTMLDivElement

  setEditableTextareaNode = node => {
    this.editableTextareaRef = node
    this.props.innerRef(node)
  }

  getClassName() {
    const { className, floatingLabels } = this.props

    return classNames(
      EditableTextarea.className,
      floatingLabels && 'with-floatingLabels',
      className
    )
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
    // Tested
    /* istanbul ignore next */
    if (nextProps.value === this.state.value) return

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

  handleOnChange = e => {
    this.setState(
      {
        value: e.target.value,
        validationInfo: null,
        validated: false,
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

  handleOnClick = e => {
    const { id, onInputFocus } = this.props
    const { value } = this.state
    const item = {
      value,
      id,
    }

    /* istanbul ignore else */
    if (this.state.readOnly) {
      this.setState(
        {
          prevValue: this.textArea.current.value,
          readOnly: false,
        },
        () => {
          this.textArea.current.focus()
          onInputFocus({ name: id, value: [item], event: e })
        }
      )
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
        }
      )
    }
  }

  handleOnKeyUp = e => {
    const code = e.key

    if (code === key.ESCAPE) {
      /* istanbul ignore next */
      e.preventDefault() && e.stopPropagation()

      this.textArea.current.blur()
    }
  }

  handleOnBlur = e => {
    const { id, onCommit, onInputBlur, validate } = this.props
    const { prevValue, value, validated } = this.state
    const item = {
      value,
      id,
    }

    // Unchanged value, or ESC case
    if (value === prevValue) {
      this.setState(
        {
          readOnly: true,
          validationInfo: null,
        },
        () => {
          scrollToTop(this.textArea.current)
        }
      )
    } else {
      /* istanbul ignore else */
      if (!validated) {
        validate({
          data: {
            cause: CAUSE.BLUR,
            operation: OPERATION.UPDATE,
            item,
          },
          name: id,
          value,
          values: [item],
        }).then(validation => {
          // Both cases tested
          /* istanbul ignore next */
          if (validation.isValid) {
            this.setState(
              {
                readOnly: true,
                validationInfo: null,
                validated: true,
                value,
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
                onInputBlur({
                  name: id,
                  value: [item],
                  event: e,
                })
                scrollToTop(this.textArea.current)
              }
            )
          } else {
            this.setState(
              {
                validationInfo: validation,
                validated: true,
              },
              () => {
                scrollToTop(this.textArea.current)
              }
            )
          }
        })
      }
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

  // Tested here and in EditableField
  /* istanbul ignore next */
  renderValidationInfo = () => {
    const { id } = this.props
    const { validationInfo } = this.state

    if (!validationInfo) return null
    if (id !== validationInfo.name) return null

    const DEFAULT_ICON = 'alert-small'

    return (
      <ValidationIconUI
        className={`${EditableTextarea.className}__validation`}
        color={getValidationColor(validationInfo)}
      >
        <Tooltip
          animationDelay={0}
          animationDuration={0}
          display="block"
          placement="top-end"
          title={validationInfo.message}
        >
          <Icon name={validationInfo.icon || DEFAULT_ICON} size={24} />
        </Tooltip>
      </ValidationIconUI>
    )
  }

  render() {
    const {
      floatingLabels,
      id,
      label,
      maxRows,
      placeholder,
      overflowCueColor,
      ...rest
    } = this.props
    const { clamped, readOnly, value, validationInfo } = this.state

    const textAreaClasses = classNames(
      'EditableTextarea__Textarea',
      'field',
      readOnly && !Boolean(value) && 'is-placeholder'
    )

    const maskClasses = classNames(
      'EditableTextarea__Mask',
      'field',
      (!readOnly || Boolean(value)) && !floatingLabels && 'is-hidden',
      readOnly && !Boolean(value) && 'is-inline'
    )

    return (
      <ComponentUI
        ref={this.setEditableTextareaNode}
        className={this.getClassName()}
      >
        {!floatingLabels ? (
          <label className="EditableTextarea__label" htmlFor={id}>
            <LabelTextUI>{label}</LabelTextUI>
          </label>
        ) : null}

        <EditableTextareaUI
          className={classNames(
            'EditableTextarea__ResizableTextarea',
            readOnly && 'is-readonly',
            /* istanbul ignore next */ readOnly && clamped && 'is-clamped',
            !Boolean(value) && 'with-placeholder'
          )}
          overflowCueColor={overflowCueColor}
          focusIndicatorColor={getValidationColor(validationInfo)}
          inputValue={value}
        >
          <Textarea
            {...getValidProps(rest)}
            className={textAreaClasses}
            id={id}
            inputRef={this.textArea}
            maxRows={maxRows}
            placeholder={placeholder}
            readOnly={readOnly}
            value={value}
            onBlur={this.handleOnBlur}
            onFocus={this.handleOnClick}
            onChange={this.handleOnChange}
            onClick={this.handleOnClick}
            onHeightChange={this.handleTextareaHeightChange}
            onKeyDown={this.handleOnKeyDown}
            onKeyUp={this.handleOnKeyUp}
          />
          <MaskUI
            className={maskClasses}
            onClick={this.handleOnClick}
            inputValue={value}
          >
            {placeholder}
          </MaskUI>
          {this.renderValidationInfo()}
        </EditableTextareaUI>
      </ComponentUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(EditableTextarea)

export default PropConnectedComponent
