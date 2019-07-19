import * as React from 'react'

import {
  EditableFieldInputUI,
  InteractiveContentUI,
  InputUI,
  InputWrapperUI,
  OptionsWrapperUI,
  OptionsDropdownUI,
  TriggerUI,
  StaticContentUI,
  StaticValueUI,
  StaticOptionUI,
  FocusIndicatorUI,
  FieldActionsUI,
  FieldButtonUI,
} from './styles/EditableField.Input.css'

import Dropdown from '../Dropdown/DropdownV2'
import Icon from '../Icon'
import Truncate from '../Truncate'
import Truncated from './EditableField.Truncate'

import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import {
  ACTION_ICONS,
  COMPONENT_KEY,
  isEllipsisActive,
} from './EditableField.utils'
import { classNames } from '../../utilities/classNames'
import { key } from '../../constants/Keys'
import { noop } from '../../utilities/other'
import * as equal from 'fast-deep-equal'

import {
  EditableFieldInputProps,
  EditableFieldInputState,
} from './EditableField.types'

export class EditableFieldInput extends React.Component<
  EditableFieldInputProps,
  EditableFieldInputState
> {
  static className = 'c-EditableFieldInput'
  static defaultProps = {
    isActive: false,
    disabled: false,
    emphasize: false,
    fieldValue: '',
    placeholder: '',
    renderAsBlock: false,
    type: 'text',
    innerRef: noop,
    onInputFocus: noop,
    onInputBlur: noop,
    onInputChange: noop,
    onOptionFocus: noop,
    onOptionSelection: noop,
    onChange: noop,
    onKeyDown: noop,
    deleteAction: noop,
    customAction: noop,
  }

  state = {
    dynamicFieldWidth: null,
    staticContentWidth: null,
  }

  actionsRef: HTMLDivElement
  editableFieldInputRef: HTMLDivElement

  interactiveContentRef: HTMLDivElement
  optionsDropdownRef: HTMLDivElement
  inputRef: HTMLInputElement

  staticContentRef: HTMLDivElement
  staticOptionRef: HTMLSpanElement
  staticValueRef: HTMLSpanElement

  setActionsNode = node => {
    this.actionsRef = node
  }

  setEditableFieldInputNode = node => {
    this.editableFieldInputRef = node
  }

  setInteractiveContentNode = node => {
    this.interactiveContentRef = node
  }

  setOptionsDropdownNode = node => {
    this.optionsDropdownRef = node
  }

  setInputNode = node => {
    this.inputRef = node
  }

  setStaticContentNode = node => {
    this.staticContentRef = node
  }

  setStaticOptionNode = node => {
    this.staticOptionRef = node
  }

  setStaticValueNode = node => {
    this.staticValueRef = node
  }

  componentDidMount() {
    const { isActive } = this.props

    /* istanbul ignore next */
    if (!this.props.renderAsBlock) {
      this.calculateFieldWidth()
    }

    this.setInputTitle()

    if (isActive) {
      /* istanbul ignore next */
      if (document.activeElement !== this.optionsDropdownRef) {
        const inputNode = this.inputRef
        inputNode && inputNode.focus()
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!equal(this.props.fieldValue, nextProps.fieldValue)) {
      return true
    }

    if (this.props.isActive !== nextProps.isActive) {
      return true
    }

    if (this.state.dynamicFieldWidth !== nextState.dynamicFieldWidth) {
      return true
    }

    return false
  }

  componentDidUpdate(prevProps) {
    const { isActive } = this.props
    /* istanbul ignore else */
    if (!this.props.renderAsBlock) {
      this.calculateFieldWidth()
    }

    this.setInputTitle()

    if (isActive) {
      if (document.activeElement !== this.optionsDropdownRef) {
        const inputNode = this.inputRef

        inputNode && inputNode.focus()
      }
    }
  }

  setInputTitle = () => {
    const { fieldValue } = this.props
    const staticValueNode = this.staticValueRef

    const contentNode =
      staticValueNode && staticValueNode.querySelector('.c-Truncate__content')
    const emailNode =
      staticValueNode && staticValueNode.querySelector('.TruncateFirstChunk')

    /* istanbul ignore if */
    if (
      (contentNode && isEllipsisActive(contentNode)) ||
      (emailNode && isEllipsisActive(emailNode))
    ) {
      const inputNode = this.inputRef

      inputNode && inputNode.setAttribute('title', fieldValue.value)
    }
  }

  getValueWidth = () => {
    const editableFieldInputNode = this.editableFieldInputRef
    const parentWidth = editableFieldInputNode.parentElement
      ? editableFieldInputNode.parentElement.getBoundingClientRect().width
      : /* istanbul ignore next */
        0
    const staticContentNode = this.staticContentRef
    const staticOptionNode = staticContentNode.querySelector(
      '.EditableField__staticOption'
    )
    const staticValueNode = staticContentNode.querySelector(
      '.EditableField__staticValue'
    )
    const staticOptionWidth = staticOptionNode
      ? staticOptionNode.getBoundingClientRect().width + 10
      : 0
    let contentWidth = 0

    // A reliable way to get the width of dynamic content
    // is by creating a temporary element
    // and get its width
    let temporaryValueNode: HTMLDivElement | null = document.createElement(
      'div'
    )

    //@ts-ignore
    // Never null
    temporaryValueNode.textContent = staticValueNode.textContent

    // To get an accurate width, apply the font styles of the field
    temporaryValueNode.classList.add('is-temporary-value')
    editableFieldInputNode.appendChild(temporaryValueNode)
    contentWidth = Math.ceil(
      temporaryValueNode.getBoundingClientRect().width + staticOptionWidth
    )

    // Clean up
    editableFieldInputNode.removeChild(temporaryValueNode)
    temporaryValueNode = null

    // The max width should be the parent width
    return contentWidth >= parentWidth
      ? parentWidth
      : /* istanbul ignore next */ contentWidth
  }

  calculateFieldWidth = () => {
    const { actions, isActive } = this.props

    if (isActive) {
      this.setState({
        dynamicFieldWidth: '100%',
        staticContentWidth: '100%',
      })
    } else {
      const editableFieldInputNode = this.editableFieldInputRef
      const parentWidth = editableFieldInputNode.parentElement
        ? editableFieldInputNode.parentElement.getBoundingClientRect().width
        : /* istanbul ignore next */
          0
      const placeholderNode = this.staticContentRef.querySelector(
        '.is-placeholder'
      )
      const staticContentWidth = placeholderNode
        ? placeholderNode.getBoundingClientRect().width
        : this.getValueWidth()
      const actionsWidth = actions ? actions.length * 25 : 0

      // If we add the actions width to the static content width and it's actually larger than the container
      // take the actions width off to make space for them
      const fieldCSSWidth =
        staticContentWidth + actionsWidth > parentWidth
          ? `${staticContentWidth - actionsWidth}px`
          : `${staticContentWidth}px`

      this.setState({
        dynamicFieldWidth: fieldCSSWidth,
        staticContentWidth: `${staticContentWidth}px`,
      })
    }
  }

  getClassName() {
    const { className, isActive, fieldValue, valueOptions } = this.props

    return classNames(
      EditableFieldInput.className,
      className,
      isActive && 'is-active',
      valueOptions && 'has-options',
      !Boolean(fieldValue.value) && 'is-empty'
    )
  }

  handleInputFocus = event => {
    const { name, onInputFocus } = this.props

    onInputFocus({ name, event })
  }

  handleInputBlur = event => {
    const { name, onInputBlur } = this.props
    const optionsNode = this.optionsDropdownRef

    /* istanbul ignore if */
    if (optionsNode && optionsNode.classList.contains('is-open')) return

    onInputBlur({ name, event })
  }

  handleOptionFocus = event => {
    const { disabled, name, onOptionFocus } = this.props
    /* istanbul ignore else */
    if (!disabled) {
      onOptionFocus({ name, event })
    }
  }

  handleChange = event => {
    const { onChange, onInputChange } = this.props

    onChange({
      inputValue: event.currentTarget.value,
      name: this.props.name,
      event,
    })
    /* istanbul ignore else */
    if (onInputChange) {
      onInputChange({
        inputValue: event.currentTarget.value,
        name: this.props.name,
        event,
      })
    }
  }

  handleKeyDown = event => {
    const isEnter = event.key === key.ENTER
    const isEscape = event.key === key.ESCAPE
    const isDropdownTrigger = event.target.classList.contains(
      'c-DropdownV2Trigger'
    )
    /* istanbul ignore else */
    if ((isEnter && !isDropdownTrigger) || isEscape) {
      const { name, onKeyDown } = this.props
      const staticValueNode = this.staticValueRef
      const inputNode = this.inputRef

      onKeyDown({ event, name }).then(() => {
        // In case the value is longer than the width of the input
        // lets move the cursor to the very beginning
        // when clicking the input the cursor will be at the expected position :)
        /* istanbul ignore else */
        if (inputNode && inputNode.setSelectionRange) {
          inputNode.setSelectionRange(0, 0)
        }
        /* istanbul ignore else */
        if (staticValueNode) {
          staticValueNode.setAttribute('tabindex', '0')
          staticValueNode.focus()
        }
      })
    }
  }

  handleActionClick = ({ action, event }) => {
    const { name, fieldValue } = this.props
    /* istanbul ignore else */
    if (action.name === 'delete') {
      this.props.deleteAction({ action, name, event })
    }
    /* istanbul ignore next */
    if (action.name === 'link') {
      window && window.open(fieldValue.value)
    } else {
      this.props.customAction({ action, name, event })
    }
  }

  /* istanbul ignore next */
  handleStaticValueKeyDown = event => {
    const inputNode = this.inputRef

    if (event.key === key.ENTER) {
      inputNode && inputNode.focus()
    }
  }

  /* istanbul ignore next */
  handleStaticValueBlur = () => {
    const staticValueNode = this.staticValueRef
    staticValueNode && staticValueNode.removeAttribute('tabindex')
  }

  handleDropdownSelect = selection => {
    const { name, fieldValue, onOptionSelection } = this.props

    onOptionSelection({ name, selection })
    /* istanbul ignore else */
    if (fieldValue.id === name && fieldValue.option === selection) {
      // Force React to render the new option
      // I have no clue as to why is not triggering rerendering by itself
      // when calling setState on EditableField:268
      this.forceUpdate()
    }

    this.optionsDropdownRef && this.optionsDropdownRef.focus()
  }

  renderInteractiveOptions = () => {
    const { disabled, fieldValue, valueOptions } = this.props

    return (
      <OptionsWrapperUI
        className="EditableField__optionsWrapper"
        onKeyDown={this.handleKeyDown}
      >
        <Dropdown
          className="EditableField__Dropdown"
          items={valueOptions}
          disabled={disabled}
          shouldRefocusOnClose={() => false}
          minWidth={75}
          maxWidth={200}
          onBlur={this.handleInputBlur}
          onFocus={this.handleOptionFocus}
          onSelect={this.handleDropdownSelect}
          triggerRef={this.setOptionsDropdownNode}
          renderTrigger={
            <TriggerUI className="EditableField__optionsTrigger">
              <OptionsDropdownUI
                className="EditableField__optionsDropdown"
                title={fieldValue.option}
              >
                <Truncate className="EditableField__selectedOption">
                  {fieldValue.option}
                </Truncate>
                <Icon name={ACTION_ICONS.valueOption} />
              </OptionsDropdownUI>
              <FocusIndicatorUI className="EditableField__focusIndicator" />
            </TriggerUI>
          }
        />
      </OptionsWrapperUI>
    )
  }

  renderStaticOption = () => {
    const { fieldValue } = this.props

    return (
      <StaticOptionUI
        className="EditableField__staticOption"
        innerRef={this.setStaticOptionNode}
      >
        <Truncate>{fieldValue.option}</Truncate>
      </StaticOptionUI>
    )
  }

  renderActions = () => {
    const { actions, renderAsBlock } = this.props

    return (
      <FieldActionsUI
        className="EditableField__actions"
        innerRef={this.setActionsNode}
        // ts complains about actions possibly being undefined
        // but renderActions is never called if actions is undefined (same below in the mapping)
        // @ts-ignore
        numberOfActions={actions.length}
        renderAsBlock={renderAsBlock}
      >
        {(actions as any).map(action => {
          return (
            <FieldButtonUI
              className={`FieldButton action-${action.name}`}
              key={action.name}
              tabIndex="-1"
              type="button"
              onClick={event => {
                this.handleActionClick({ action, event })
              }}
            >
              <Icon name={action.icon || ACTION_ICONS[action.name]} size="16" />
            </FieldButtonUI>
          )
        })}
      </FieldActionsUI>
    )
  }

  render() {
    const {
      actions,
      disabled,
      emphasize,
      fieldValue,
      isActive,
      name,
      placeholder,
      renderAsBlock,
      type,
      valueOptions,
      ...rest
    } = this.props

    const { dynamicFieldWidth, staticContentWidth } = this.state

    return (
      <EditableFieldInputUI
        className={this.getClassName()}
        dynamicFieldWidth={dynamicFieldWidth}
        renderAsBlock={renderAsBlock}
        innerRef={this.setEditableFieldInputNode}
      >
        <InteractiveContentUI
          className="EditableField__interactiveContent"
          innerRef={this.setInteractiveContentNode}
        >
          {valueOptions ? this.renderInteractiveOptions() : null}

          <InputWrapperUI className="EditableField__inputWrapper">
            <InputUI
              {...getValidProps(rest)}
              className="EditableField__input"
              id={name}
              innerRef={this.setInputNode}
              name={name}
              disabled={disabled}
              placeholder={placeholder}
              type={type}
              value={fieldValue.value}
              onBlur={this.handleInputBlur}
              onChange={this.handleChange}
              onFocus={this.handleInputFocus}
              onKeyDown={this.handleKeyDown}
            />
            <FocusIndicatorUI className="EditableField__focusIndicator" />
          </InputWrapperUI>
        </InteractiveContentUI>

        <StaticContentUI
          className="EditableField__staticContent"
          renderAsBlock={renderAsBlock}
          staticContentWidth={staticContentWidth}
          innerRef={this.setStaticContentNode}
        >
          {valueOptions ? this.renderStaticOption() : null}

          <StaticValueUI
            className={classNames(
              'EditableField__staticValue',
              !fieldValue.value && 'with-placeholder',
              emphasize && 'is-emphasized'
            )}
            innerRef={this.setStaticValueNode}
            onBlur={this.handleStaticValueBlur}
            onKeyDown={this.handleStaticValueKeyDown}
          >
            {fieldValue.value ? (
              <Truncated
                string={fieldValue.value}
                splitter={type === 'email' ? '@' : undefined}
              />
            ) : (
              <span className="is-placeholder">{placeholder}</span>
            )}
          </StaticValueUI>
        </StaticContentUI>

        {actions && Boolean(fieldValue.value) && !disabled
          ? this.renderActions()
          : null}
      </EditableFieldInputUI>
    )
  }
}

const PropConnectedComponent = propConnect(`${COMPONENT_KEY}Input`)(
  EditableFieldInput
)

export default PropConnectedComponent
