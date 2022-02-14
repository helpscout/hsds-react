import React from 'react'
import PropTypes from 'prop-types'
import Textarea from 'react-textarea-autosize'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import debounce from '../../utilities/debounce'
import { ComponentUI, EditableTextareaUI, MaskUI } from './EditableTextarea.css'
import {
  LabelTextUI,
  ValidationIconUI,
} from '../EditableField/EditableField.css'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import { scrollToTop } from './EditableTextarea.utils'
import { key } from '../../constants/Keys'
import { CAUSE, OPERATION } from '../EditableField/EditableField.constants'
import { getValidationColor } from '../EditableField/EditableField.utils'

function noop() {}

export class EditableTextarea extends React.PureComponent {
  static className = 'c-EditableTextarea'

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

  textArea
  debouncedScroll
  editableTextareaRef

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

  componentDidMount() {
    this.textArea.current.addEventListener('scroll', this.debouncedScroll)
  }

  componentWillUnmount() {
    this.textArea.current.removeEventListener('scroll', this.debouncedScroll)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Tested

    if (nextProps.value === this.state.value) return

    this.setState({
      value: nextProps.value,
    })
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

    const stop = () => e.preventDefault() && e.stopPropagation()

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
          // trigger blur
          this.handleOnBlur()
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

    this.props.onInputKeyDown({
      name: this.props.id,
      value: [{ value: this.state.value, id: this.props.id }],
      event: e,
    })
  }

  handleOnKeyUp = e => {
    const code = e.key

    if (code === key.ESCAPE) {
      e.preventDefault() && e.stopPropagation()

      this.textArea.current.blur()
    }

    this.props.onInputKeyUp({
      name: this.props.id,
      value: [{ value: this.state.value, id: this.props.id }],
      event: e,
    })
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
            readOnly && clamped && 'is-clamped',
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
            <span>{placeholder}</span>
          </MaskUI>
          {this.renderValidationInfo()}
        </EditableTextareaUI>
      </ComponentUI>
    )
  }
}

EditableTextarea.defaultProps = {
  'data-cy': 'EditableTextarea',
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
  onInputKeyDown: noop,
  onInputKeyUp: noop,
  onEnter: noop,
  onEscape: noop,
  validate: () => Promise.resolve({ isValid: true }),
}

EditableTextarea.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** The id to assign to the component. */
  id: PropTypes.string,
  /** Uses the "floating label" pattern with animation */
  floatingLabels: PropTypes.bool,
  /** The label for the field */
  label: PropTypes.string,
  /** The maximum number of lines the textarea will grow to (max height). */
  maxRows: PropTypes.number,
  /** The color of the visual cue when content is overflowing. */
  overflowCueColor: PropTypes.string,
  /** The placeholder of the textarea. */
  placeholder: PropTypes.string,
  /** The value of the textarea. */
  value: PropTypes.string,
  /** Function that validates the value, should always return a Promise that resolves to a Validation type */
  validate: PropTypes.func,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Fires when either the input or an option is changed */
  onChange: PropTypes.func,
  /** Fires when Enter is pressed on the input */
  onEnter: PropTypes.func,
  /** Fires when Escape is pressed on the input */
  onEscape: PropTypes.func,
  /** Fires when a change is “saved” (see below) */
  onCommit: PropTypes.func,
  /** Fired when the input is focused */
  onInputFocus: PropTypes.func,
  /** Fired when the input is blurred */
  onInputBlur: PropTypes.func,
  /** Fires on textarea keyup */
  onInputKeyDown: PropTypes.func,
  /** Fires on textarea keydown */
  onInputKeyUp: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default EditableTextarea
