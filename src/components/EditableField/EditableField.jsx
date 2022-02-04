import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import classNames from 'classnames'
import {
  EditableFieldUI,
  FieldUI,
  LabelTextUI,
  AddButtonUI,
} from './EditableField.css'
import {
  ACTION_ICONS,
  CAUSE,
  EMPTY_VALUE,
  FIELDTYPES,
  FIELDSIZES,
  OPERATION,
} from './EditableField.constants'
import { EditableFieldInput as Input } from './EditableField.Input'
import { EditableFieldMask as Mask } from './EditableField.Mask'
import { EditableFieldActions as Actions } from './EditableField.Actions'
import Icon from '../Icon'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import {
  createNewValueFieldObject,
  generateFieldActions,
  normalizeFieldValue,
  EDITABLEFIELD_CLASSNAMES,
  STATES_CLASSNAMES,
} from './EditableField.utils'
import { key } from '../../constants/Keys'
import { noop } from '../../utilities/other'
import { isArray, isFunction } from '../../utilities/is'
import { find } from '../../utilities/arrays'
import { nodesHaveSameParent } from '../../utilities/node'

export class EditableField extends React.Component {
  static className = EDITABLEFIELD_CLASSNAMES.component

  constructor(props) {
    super(props)

    const {
      actions,
      name,
      defaultOption,
      multipleValues,
      value,
      valueOptions,
    } = props

    let defaultStateOption = null

    if (valueOptions) {
      defaultStateOption = defaultOption ? defaultOption : valueOptions[0]
    }

    const initialFieldValue = normalizeFieldValue({
      value,
      name,
      defaultOption: defaultStateOption,
    })

    this.state = {
      actions: generateFieldActions(actions),
      activeField: EMPTY_VALUE,
      defaultOption: defaultStateOption,
      disabledItem: [],
      fieldValue: initialFieldValue,
      initialFieldValue,
      maskTabIndex: null,
      multipleValuesEnabled: isArray(value) || multipleValues,
      valueOptions:
        valueOptions && isArray(valueOptions)
          ? valueOptions.map(option => ({
              id: option,
              label: option,
              value: option,
            }))
          : null,
      validationInfo: [],
    }
  }

  editableFieldRef

  shouldComponentUpdate(nextProps, nextState) {
    if (!equal(this.props.value, nextProps.value)) {
      return true
    }

    if (this.props.disabled !== nextProps.disabled) {
      return true
    }

    if (!equal(this.state.fieldValue, nextState.fieldValue)) {
      return true
    }

    if (this.state.activeField !== nextState.activeField) {
      return true
    }

    if (this.state.maskTabIndex !== nextState.maskTabIndex) {
      return true
    }

    if (!equal(this.state.disabledItem, nextState.disabledItem)) {
      return true
    }

    // Tested

    if (!equal(this.state.validationInfo, nextState.validationInfo)) {
      return true
    }

    return false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (equal(nextProps.value, this.props.value)) return

    const { name, defaultOption, value, valueOptions } = nextProps
    let defaultStateOption = null

    // tested
    if (valueOptions) {
      defaultStateOption = defaultOption ? defaultOption : valueOptions[0]
    }

    const initialFieldValue = normalizeFieldValue({
      value,
      name,
      defaultOption: defaultStateOption,
    })

    if (!equal(initialFieldValue, this.state.fieldValue)) {
      this.setState({
        fieldValue: initialFieldValue,
        initialFieldValue,
      })
    }
  }

  setEditableNode = node => {
    this.editableFieldRef = node
    this.props.innerRef(node)
  }

  getClassName() {
    const { className, size, disabled, floatingLabels } = this.props

    return classNames(
      EditableField.className,
      className,
      disabled && STATES_CLASSNAMES.fieldDisabled,
      size === FIELDSIZES.lg && STATES_CLASSNAMES.isLarge,
      floatingLabels && STATES_CLASSNAMES.withFloatingLabels
    )
  }

  assignInputValueToFieldValue = ({ inputValue, name }) => {
    const { fieldValue } = this.state

    return fieldValue.map(val => {
      if (val.id === name) {
        return { ...val, value: inputValue, validated: false }
      }
      return val
    })
  }

  handleInputFocus = ({ name, event }) => {
    const { onInputFocus } = this.props
    const { fieldValue } = this.state

    // There is a bug in Safari as of version 14.0.1 where a second focus event
    // is being received on inputs. The bug is not fixed in the technology
    // preview of 14.1.0 either. It would appear that Safari has had an on-again
    // off-again issue with focus events.
    // See: https://github.com/facebook/react/issues/10871
    // See: https://bugs.webkit.org/show_bug.cgi?id=179990

    // In the case where this happens, the second focus event will have a
    // secondary target. If we have an EditableField, the secondary target
    // will be the field mask. If we have an EditableFieldComposite, the
    // secondary target will be the composed mask. Otherwise the secondary
    // target will be null or another element in the case of tab navigation.
    const isSafari =
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('Chrome') === -1
    const maskIsSecondaryTarget =
      !!event.relatedTarget &&
      (event.relatedTarget.classList.contains('FieldMask__value') ||
        event.relatedTarget.classList.contains('ComposedMask'))
    if (isSafari && maskIsSecondaryTarget) {
      event.target.blur()
      return
    }

    this.setState(
      {
        activeField: name,
        maskTabIndex: null,
      },
      () => {
        onInputFocus({ name, value: fieldValue, event })
      }
    )
  }

  handleInputBlur = payload => {
    const { name, event } = payload
    const { activeField, multipleValuesEnabled, valueOptions } = this.state
    const { validate, onCommit, onDiscard, onInputBlur } = this.props
    const hasOptions = valueOptions != null
    const changedField =
      this.state.fieldValue.length === 1
        ? this.state.fieldValue[0]
        : find(this.state.fieldValue, val => val.id === event.target.id)
    const initialField =
      this.state.initialFieldValue.length === 1
        ? this.state.initialFieldValue[0]
        : find(this.state.initialFieldValue, val => val.id === event.target.id)

    if (
      equal(this.state.initialFieldValue, this.state.fieldValue) ||
      equal(initialField, changedField) ||
      this.state.disabledItem.indexOf(changedField.id) !== -1
    ) {
      // On multiple value fields, if we jump from one input to another
      // of the same EditableField, all we want is to fire onInputBlur
      const parentSelector = `[data-field-id="ef_${this.props.name}"]`
      const nextElHasSameParent = nodesHaveSameParent(
        parentSelector,
        event.relatedTarget,
        event.target
      )

      if (nextElHasSameParent) {
        onInputBlur({ name, value: this.state.fieldValue, event })
        return
      }

      this.setState({ activeField: EMPTY_VALUE }, () => {
        onInputBlur({ name, value: this.state.fieldValue, event })
      })

      return
    }

    const removedEmptyFields = this.state.fieldValue.filter(field =>
      Boolean(field.value)
    )

    // In multivalue fields, remove the empty one when there're at least 2 fields
    const shouldDiscardEmpty =
      !hasOptions &&
      multipleValuesEnabled &&
      removedEmptyFields.length < this.state.fieldValue.length

    if (shouldDiscardEmpty) {
      console.log('here 2')
      let deletedField

      // if the last visible field has been removed, remove its _id property before
      // updating the internal state for 'fieldValue' so it accurately represents an
      // empty field. If _id exists on an otherwise empty field property, it will
      // force a PUT api call instead of a POST if the user tries to create a new item.
      if (removedEmptyFields.length === 0) {
        deletedField = { ...changedField }
        delete deletedField._id
      }

      this.setState(
        {
          activeField: EMPTY_VALUE,
          disabledItem: this.state.disabledItem.filter(
            item => item !== changedField.id
          ),
          fieldValue:
            removedEmptyFields.length > 0 ? removedEmptyFields : [deletedField],
          initialFieldValue: this.state.fieldValue,
        },
        () => {
          onCommit({
            name,
            value: this.state.fieldValue,
            data: {
              cause: CAUSE.BLUR,
              operation: OPERATION.DELETE,
              item: changedField,
            },
          })
          onDiscard({ value: this.state.fieldValue })
          onInputBlur({ name, value: this.state.fieldValue, event })
        }
      )

      return
    }

    let optionChanged =
      hasOptions && initialField
        ? initialField.option !== changedField.option
        : false

    if (!changedField.validated || optionChanged) {
      this.setState({
        disabledItem: this.state.disabledItem.concat(changedField.id),
      })

      // Get the next values and commit prior to validation so that
      // we can use it in validation.
      let updatedFieldValue = this.state.fieldValue.map(field => {
        // tested

        if (field.id === changedField.id) {
          return { ...changedField, validated: true }
        }
        // tested

        return field
      })

      // Allow references to this event to be maintained in the async
      // code that follows.
      event && event.persist && event.persist()

      validate({
        data: {
          cause: CAUSE.BLUR,
          operation:
            updatedFieldValue.length > this.state.initialFieldValue.length
              ? OPERATION.CREATE
              : OPERATION.UPDATE,
          item: changedField,
        },
        name: changedField.id,
        value: changedField.value,
        values: updatedFieldValue,
      })
        .then(validation => {
          // Since this is async and the state of other fields may have changed,
          // we need to recompute this.
          updatedFieldValue = this.state.fieldValue.map(field => {
            // tested

            if (field.id === changedField.id) {
              const updatedProps =
                validation.isValid && validation.updatedProps
                  ? validation.updatedProps
                  : {}
              return {
                ...changedField,
                validated: true,
                ...updatedProps,
              }
            }
            // tested

            return field
          })

          if (validation.isValid) {
            // 1. Non-empty Value
            if (changedField.value) {
              this.setState(
                {
                  disabledItem: this.state.disabledItem.filter(
                    item => item !== changedField.id
                  ),
                  fieldValue: updatedFieldValue,
                  initialFieldValue: updatedFieldValue,
                  validationInfo: this.state.validationInfo.filter(
                    valItem => valItem.name !== changedField.id
                  ),
                },
                () => {
                  onCommit({
                    name,
                    value: this.state.fieldValue,
                    data: {
                      cause: CAUSE.BLUR,
                      operation:
                        updatedFieldValue.length >
                        this.state.initialFieldValue.length
                          ? OPERATION.CREATE
                          : OPERATION.UPDATE,
                      item: changedField,
                    },
                  })
                  onInputBlur({ name, value: this.state.fieldValue, event })

                  /**
                   * Managing "Active Field"
                   *
                   * One consequence of the 'blur' activity being _always_ async (the result of being executed inside a Promise)
                   * is that the normal sequence of events is no longer executed in the "regular" flow.
                   *
                   * Sync (previous behaviour):
                   * 1. blur (sets activeField to '')
                   * 2. focus (sets activeField to whatever input was focused)
                   *
                   * Async (current behaviour):
                   * 1. blur ...validation Promise...
                   * 2. focus (sets activeField to whatever input was focused)
                   * 3. ...validation Promise comes back... blur sets activeField to '' <=== DAMN!
                   *
                   * To get back the correct behaviour, we leave 'focus' as is, which will _always_ set the activeField
                   * to the focused input. With that info, we can update the active field _after_ the blur
                   * setState, knowing that if the activeState in the state is different from what we had before
                   * it means the focus event kicked in.
                   *
                   * In multiple value EFs, We also need to check if the next element that receives focus is part of the
                   * same group.
                   */

                  const unchangedByFocusEvent =
                    this.state.activeField === activeField
                  const parentSelector = `[data-field-id="ef_${this.props.name}"]`
                  const nextElHasSameParent = nodesHaveSameParent(
                    parentSelector,
                    event.relatedTarget,
                    event.target
                  )

                  if (!nextElHasSameParent) {
                    this.setState({
                      activeField: unchangedByFocusEvent
                        ? EMPTY_VALUE
                        : this.state.activeField,
                    })
                  }
                }
              )
            } else {
              // 2. Empty value
              // If single value or multivalue field with just one value, clear the field but don't remove it
              this.setState(
                {
                  activeField: EMPTY_VALUE,
                  disabledItem: this.state.disabledItem.filter(
                    item => item !== changedField.id
                  ),
                  fieldValue: this.state.fieldValue,
                  initialFieldValue: this.state.fieldValue,
                },
                () => {
                  onCommit({
                    name,
                    value: this.state.fieldValue,
                    data: {
                      cause: CAUSE.BLUR,
                      operation: OPERATION.UPDATE,
                      item: this.state.fieldValue.filter(
                        field => !Boolean(field.value)
                      )[0],
                    },
                  })
                  onInputBlur({ name, value: this.state.fieldValue, event })
                }
              )
            }
          } else {
            this.setState(
              {
                disabledItem: this.state.disabledItem.filter(
                  item => item !== changedField.id
                ),
                fieldValue: updatedFieldValue,
                validationInfo: this.state.validationInfo.concat(validation),
              },
              () => {
                onInputBlur({ name, value: this.state.fieldValue, event })
              }
            )
          }
        })
        .catch(() => {
          this.setState(
            {
              disabledItem: this.state.disabledItem.filter(
                item => item !== name
              ),
            },
            () => this.handleFieldEscapePress({ event, name })
          )
        })

      return
    }
  }

  handleInputChange = ({ inputValue, name, event }) => {
    const { onChange } = this.props
    const newFieldValue = this.assignInputValueToFieldValue({
      inputValue,
      name,
    })

    this.setState(
      {
        fieldValue: newFieldValue,
        validationInfo: this.state.validationInfo.filter(
          valItem => valItem.name !== name
        ),
      },
      () => {
        onChange({ name, value: newFieldValue, event })
      }
    )
  }

  handleInputKeyDown = ({ event, name }) => {
    const isEnter = event.key === key.ENTER
    const isEscape = event.key === key.ESCAPE

    const { fieldValue: value } = this.state
    this.props.onInputKeyDown({ name, value, event })

    if (isEnter) {
      return this.handleFieldEnterPress({ event, name })
    } else if (isEscape) {
      return this.handleFieldEscapePress({ event, name })
    }

    return new Promise((resolve, reject) => {
      reject()
    })
  }

  handleInputKeyPress = ({ name, event }) => {
    const { fieldValue: value } = this.state
    this.props.onInputKeyPress({ name, value, event })
  }

  handleInputKeyUp = ({ name, event }) => {
    const { fieldValue: value } = this.state
    this.props.onInputKeyUp({ name, value, event })
  }

  handleFieldEnterPress = ({ event, name }) => {
    const { validate, onEnter, onCommit } = this.props
    const { initialFieldValue, fieldValue, multipleValuesEnabled } = this.state
    const inputValue = event.currentTarget.value
    const impactedField = find(initialFieldValue, val => val.id === name)
    const valueDidNotChange =
      impactedField && inputValue === impactedField.value

    return new Promise(resolve => {
      const cachedEvent = { ...event }

      // Case 1: in multi-value fields if value is empty
      // Do nothing
      if (multipleValuesEnabled && inputValue === EMPTY_VALUE) {
        return
      }
      // Case 2: value was not changed
      // Just change active status
      else if (valueDidNotChange) {
        this.setState({ activeField: EMPTY_VALUE, maskTabIndex: name }, () => {
          resolve()

          onEnter({ name, value: fieldValue, event: cachedEvent })
        })
      } else {
        // Case 3: value was changed
        const impactedField = find(fieldValue, val => val.id === name)

        // Get the next values and commit prior to validation so that
        // we can use it in validation.
        let updatedFieldValue = this.updateFieldValue({
          name,
          value: inputValue,
        })

        // Skip if the field was marked as validated

        if (!impactedField.validated) {
          this.setState({ disabledItem: this.state.disabledItem.concat(name) })

          // Allow references to this event to be maintained in the async
          // code that follows.
          event && event.persist && event.persist()

          validate({
            data: {
              cause: CAUSE.ENTER,
              operation:
                updatedFieldValue.length > initialFieldValue.length
                  ? OPERATION.CREATE
                  : OPERATION.UPDATE,
              item: updatedFieldValue.filter(field => field.id === name)[0],
            },
            name,
            value: inputValue,
            values: updatedFieldValue,
          })
            .then(validation => {
              if (validation.isValid) {
                // Since this is async and the state of other fields may have changed,
                // we need to recompute this.
                updatedFieldValue = this.updateFieldValue({
                  name,
                  value: inputValue,
                  updatedProps: validation.updatedProps || {},
                })

                this.setState(
                  {
                    activeField: EMPTY_VALUE,
                    disabledItem: this.state.disabledItem.filter(
                      item => item !== name
                    ),
                    fieldValue: updatedFieldValue,
                    initialFieldValue: updatedFieldValue,
                    maskTabIndex: name,
                    validationInfo: this.state.validationInfo.filter(
                      valItem => valItem.name === name
                    ),
                  },
                  () => {
                    resolve()
                    onCommit({
                      name,
                      value: updatedFieldValue,
                      data: {
                        cause: CAUSE.ENTER,
                        operation:
                          updatedFieldValue.length > initialFieldValue.length
                            ? OPERATION.CREATE
                            : OPERATION.UPDATE,
                        item: updatedFieldValue.filter(
                          field => field.id === name
                        )[0],
                      },
                    })

                    onEnter({
                      name,
                      value: updatedFieldValue,
                      event: cachedEvent,
                    })
                  }
                )
              } else {
                updatedFieldValue = fieldValue.map(field => {
                  if (field.id === name) {
                    return { ...field, validated: true }
                  }

                  return field
                })

                this.setState(
                  {
                    activeField: name,
                    disabledItem: this.state.disabledItem.filter(
                      item => item !== name
                    ),
                    fieldValue: updatedFieldValue,
                    validationInfo: this.state.validationInfo.concat(
                      validation
                    ),
                  },
                  () => {
                    resolve()

                    onEnter({
                      name,
                      value: updatedFieldValue,
                      event: cachedEvent,
                    })
                  }
                )
              }
            })
            .catch(() => {
              this.setState(
                {
                  disabledItem: this.state.disabledItem.filter(
                    item => item !== name
                  ),
                },
                () => this.handleFieldEscapePress({ event, name })
              )
            })
        }
      }
    })
  }

  // tested

  updateFieldValue = ({ value, name, updatedProps = {} }) => {
    const { fieldValue } = this.state

    return fieldValue.map(val => {
      if (val.id === name) {
        return {
          ...val,
          ...updatedProps,
          value: value,
          validated: true,
        }
      }
      return val
    })
  }

  handleFieldEscapePress = ({ event, name }) => {
    const { onEscape, onDiscard } = this.props
    const { initialFieldValue } = this.state
    const cachedEvent = { ...event }

    return new Promise(resolve => {
      // Change active status and return fieldValue to initialValue
      this.setState(
        {
          activeField: EMPTY_VALUE,
          fieldValue: initialFieldValue,
          maskTabIndex: name,
        },
        () => {
          resolve()
          onEscape({ name, value: initialFieldValue, event: cachedEvent })
          onDiscard({ value: initialFieldValue })
        }
      )
    })
  }

  handleMaskValueKeyDown = ({ event, name }) => {
    const isEnter = event.key === key.ENTER
    const isEscape = event.key === key.ESCAPE

    if (isEnter || isEscape) {
      this.setState(
        {
          maskTabIndex: null,
        },
        () => {
          const inputNode = document.getElementById(name)
          isEnter && inputNode && inputNode.focus()
        }
      )
    }
  }

  handleOptionFocus = ({ name, event }) => {
    const { onOptionFocus } = this.props

    this.setState(
      {
        activeField: name,
      },
      () => {
        onOptionFocus({ name, value: this.state.fieldValue, event })
      }
    )
  }

  handleOptionSelection = ({ name, selection }) => {
    const { onChange, onOptionChange, onCommit } = this.props
    const { fieldValue } = this.state
    let newFieldValue = []
    let changed = false
    let hasBeenValidated = ''
    const label = typeof selection === 'string' ? selection : selection.label

    for (const value of fieldValue) {
      const temp = { ...value }

      if (temp.id === name && temp.option !== label) {
        temp.option = label
        changed = true
      }

      if (temp.id === name && temp.validated) {
        hasBeenValidated = temp.id
      }

      newFieldValue.push(temp)
    }

    if (changed) {
      let isItemInvalid

      if (hasBeenValidated !== '') {
        isItemInvalid = find(
          this.state.validationInfo,
          val => val.name === hasBeenValidated
        )
      }

      const item = newFieldValue.filter(field => field.id === name)[0]

      this.setState({ fieldValue: newFieldValue, activeField: name }, () => {
        if (!isItemInvalid && item.value !== '') {
          onCommit({
            name,
            value: newFieldValue,
            data: {
              cause: CAUSE.OPTION_SELECTION,
              operation: OPERATION.UPDATE,
              item,
            },
          })
        }
        onOptionChange({ name, selection, value: newFieldValue })
        onChange({ name, value: newFieldValue })
      })
    }
  }

  handleAddValue = () => {
    const { onAdd } = this.props
    const { fieldValue, defaultOption } = this.state
    const isNotSingleEmptyValue =
      fieldValue[fieldValue.length - 1].value !== EMPTY_VALUE

    if (isNotSingleEmptyValue) {
      const { name } = this.props
      const newValueObject = createNewValueFieldObject(
        EMPTY_VALUE,
        name,
        defaultOption
      )
      const newFieldValue = fieldValue.concat(newValueObject)
      const newState = {
        fieldValue: newFieldValue,
        activeField: newValueObject.id,
      }

      this.setState(newState, () => {
        onAdd({ name, value: newFieldValue })
      })
    }
  }

  handleDeleteAction = ({ action, name, event }) => {
    const { onCommit, onDelete } = this.props
    const { defaultOption, fieldValue } = this.state
    const cachedEvent = { ...event }
    let updatedFieldValue = []

    // Clearing value
    // When there is only one item in the fieldValue array
    if (fieldValue.length === 1) {
      const emptyValue = {
        // The id is the input id and we will need to keep this to recycle
        // the field, but we need to drop all other data associated with it.
        id: fieldValue[0].id,
        value: EMPTY_VALUE,
        validated: false,
      }

      if (defaultOption != null) {
        emptyValue.option = defaultOption
      }

      updatedFieldValue = [emptyValue]
    } else {
      // Deleting value
      // Remove the item from the array
      updatedFieldValue = fieldValue.filter(val => val.id !== name)
    }

    this.setState(
      {
        fieldValue: updatedFieldValue,
        initialFieldValue: updatedFieldValue,
      },
      () => {
        onDelete({ name, value: this.state.fieldValue, event })
        onCommit({
          name,
          value: this.state.fieldValue,
          data: {
            cause: CAUSE.DELETE_ACTION,
            operation: OPERATION.DELETE,
            item: fieldValue.filter(field => field.id === name)[0],
          },
        })

        if (isFunction(action.callback)) {
          action.callback({
            name,
            action,
            value: fieldValue,
            event: cachedEvent,
          })
        }
      }
    )
  }

  handleCustomAction = ({ action, name, event }) => {
    const { fieldValue } = this.state

    if (isFunction(action.callback)) {
      action.callback({ name, action, value: fieldValue, event })
    }
  }

  renderAddButton = () => {
    const { disabled } = this.props
    const { fieldValue, multipleValuesEnabled } = this.state

    const isLastValueEmpty =
      fieldValue[fieldValue.length - 1].value === EMPTY_VALUE
    const isSingleAndEmpty = fieldValue.length === 1 && isLastValueEmpty
    const invalidValuePresent =
      this.state.validationInfo.filter(valItem => !valItem.isValid).length > 0

    return multipleValuesEnabled && !isSingleAndEmpty && !disabled ? (
      <AddButtonUI
        className={EDITABLEFIELD_CLASSNAMES.addButton}
        type="button"
        onClick={this.handleAddValue}
        disabled={isLastValueEmpty || invalidValuePresent}
      >
        <Icon name={ACTION_ICONS.plus} size="24" />
      </AddButtonUI>
    ) : null
  }

  renderFields = () => {
    const { name, disabled, emphasizeTopValue, type, ...rest } = this.props
    const {
      actions,
      activeField,
      disabledItem,
      fieldValue,
      maskTabIndex,
      multipleValuesEnabled,
      valueOptions,
    } = this.state

    return (
      <div className={EDITABLEFIELD_CLASSNAMES.fieldWrapper}>
        {fieldValue.map((val, index) => {
          const isActive = activeField === val.id
          const isDisabled =
            disabled || val.disabled || this.state.disabledItem.includes(val.id)
          const valInfo = find(
            this.state.validationInfo,
            valItem => valItem.name === val.id
          )

          return (
            <FieldUI
              className={classNames(
                EDITABLEFIELD_CLASSNAMES.field,
                isDisabled && STATES_CLASSNAMES.fieldDisabled,
                isActive && STATES_CLASSNAMES.isActive,
                valueOptions && STATES_CLASSNAMES.hasOptions,
                !Boolean(val.value) && STATES_CLASSNAMES.isEmpty
              )}
              key={val.id}
            >
              <Input
                {...getValidProps(rest)}
                actions={actions}
                disabled={isDisabled}
                fieldValue={val}
                isActive={isActive}
                name={val.id}
                type={type}
                validationInfo={valInfo}
                valueOptions={valueOptions}
                onInputFocus={this.handleInputFocus}
                onInputBlur={this.handleInputBlur}
                onOptionFocus={this.handleOptionFocus}
                onOptionSelection={this.handleOptionSelection}
                onChange={this.handleInputChange}
                onKeyDown={this.handleInputKeyDown}
                onKeyPress={this.handleInputKeyPress}
                onKeyUp={this.handleInputKeyUp}
              />
              <Mask
                {...getValidProps(rest)}
                actions={actions}
                disabled={isDisabled}
                emphasize={
                  multipleValuesEnabled && emphasizeTopValue && index === 0
                }
                fieldValue={val}
                maskTabIndex={maskTabIndex}
                name={val.id}
                type={type}
                valueOptions={valueOptions}
                validationInfo={valInfo}
                onValueKeyDown={this.handleMaskValueKeyDown}
              />
              {actions &&
              Boolean(val.value) &&
              disabledItem.indexOf(val.id) === -1 &&
              !disabled ? (
                <Actions
                  actions={actions}
                  fieldValue={val}
                  name={val.id}
                  customAction={this.handleCustomAction}
                  deleteAction={this.handleDeleteAction}
                  validationInfo={valInfo}
                />
              ) : null}
            </FieldUI>
          )
        })}

        {this.renderAddButton()}
      </div>
    )
  }

  renderFieldsInline = () => {
    const { name, inline, type, ...rest } = this.props
    const { activeField, fieldValue } = this.state

    return (
      <div className={EDITABLEFIELD_CLASSNAMES.fieldWrapper}>
        {fieldValue.map(val => {
          const isActive = activeField === val.id

          return (
            <FieldUI
              className={classNames(
                EDITABLEFIELD_CLASSNAMES.field,
                isActive && STATES_CLASSNAMES.isActive,
                !Boolean(val.value) && STATES_CLASSNAMES.isEmpty
              )}
              key={val.id}
            >
              <Input
                {...getValidProps(rest)}
                disabled={false}
                fieldValue={val}
                isActive={isActive}
                inline={inline}
                name={val.id}
                type={type}
                onInputFocus={this.handleInputFocus}
                onInputBlur={this.handleInputBlur}
                onOptionFocus={this.handleOptionFocus}
                onOptionSelection={this.handleOptionSelection}
                onChange={this.handleInputChange}
                onKeyDown={this.handleInputKeyDown}
              />
            </FieldUI>
          )
        })}
      </div>
    )
  }

  render() {
    const {
      disabled,
      floatingLabels,
      inline,
      label,
      placeholder,
      name,
      type,
      value,
      ...rest
    } = this.props
    const { fieldValue } = this.state

    if (inline) {
      return (
        <EditableFieldUI
          {...getValidProps(rest)}
          data-field-id={`ef_${name}`}
          className={this.getClassName()}
          ref={this.setEditableNode}
          inline
        >
          {this.renderFieldsInline()}
        </EditableFieldUI>
      )
    }

    return (
      <EditableFieldUI
        {...getValidProps(rest)}
        data-field-id={`ef_${name}`}
        className={this.getClassName()}
        ref={this.setEditableNode}
      >
        {!floatingLabels ? (
          <label
            className={EDITABLEFIELD_CLASSNAMES.label}
            htmlFor={fieldValue[0].id}
          >
            <LabelTextUI className={EDITABLEFIELD_CLASSNAMES.labelText}>
              {label || name}
            </LabelTextUI>
          </label>
        ) : null}

        {this.renderFields()}
      </EditableFieldUI>
    )
  }
}

EditableField.defaultProps = {
  type: FIELDTYPES.text,
  'data-cy': 'EditableField',
  defaultOption: null,
  disabled: false,
  emphasizeTopValue: false,
  floatingLabels: false,
  inline: false,
  multipleValues: false,
  size: FIELDSIZES.md,
  value: EMPTY_VALUE,
  innerRef: noop,
  onAdd: noop,
  onChange: noop,
  onCommit: noop,
  onDelete: noop,
  onDiscard: noop,
  onEnter: noop,
  onEscape: noop,
  onInputBlur: noop,
  onInputFocus: noop,
  onInputKeyDown: noop,
  onInputKeyPress: noop,
  onInputKeyUp: noop,
  onOptionBlur: noop,
  onOptionChange: noop,
  onOptionFocus: noop,
  validate: () => Promise.resolve({ isValid: true }),
}

EditableField.propTypes = {
  /** Actions to attach to an EditableField (default includes 'delete') */
  actions: PropTypes.any,
  /** The className of the component. */
  className: PropTypes.string,
  /** If the EditableField is “option-enabled” by using the valueOptions array, the user can provide which of the options should be the default, if non provided, EditableField will choose the first option in the valueOptions array. */
  defaultOption: PropTypes.any,
  /** Disable the field */
  disabled: PropTypes.bool,
  /** In multi-value fields, bold the first value (to visually denote the default value, on a list of emails for example) */
  emphasizeTopValue: PropTypes.bool,
  /** Uses the "floating label" pattern with animation */
  floatingLabels: PropTypes.bool,
  /** Renders fields inline */
  inline: PropTypes.bool,
  /** The text for the EditableField label */
  label: PropTypes.string,
  /** If you want to force a multi-value field, set this to `true` */
  multipleValues: PropTypes.bool,
  /** The **unique** identifier for the EditableField - Ties label with input - Used to generate React `keys` - Used to manage correct handling (adding, deleting, editing) of multiple-value fields */
  name: PropTypes.string,
  /** Text for the placholder */
  placeholder: PropTypes.string,
  /** Field size */
  size: PropTypes.oneOf(['md', 'lg']),
  /** The type of field, one of 'text', 'email', 'url', 'tel' , 'number’, 'password' */
  type: PropTypes.oneOf(['text', 'email', 'url', 'tel', 'number', 'password']),
  /** Initial value for the EditableField, user will normally provide a string or array of strings (in case multi-value enabled fields) which internally get converted to `FieldValues` */
  value: PropTypes.any,
  /** When the user wants a field with “options” (like “home”, “work” options for phone numbers) she passes an array of strings with the available options. EditableField will make sure to show the appropriate dropdown. The array of strings internally gets converted to an array of `Option`. `Option` type is the same as what Dropdown V2 accepts as items. */
  valueOptions: PropTypes.any,
  /** Function that validates the value, should always return a Promise that resolves to a Validation type */
  validate: PropTypes.func,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Fired when the input is focused */
  onInputFocus: PropTypes.func,
  /** Fired when the input is blurred */
  onInputBlur: PropTypes.func,
  /** Fired on the appropriate keyboard event */
  onInputKeyDown: PropTypes.func,
  /** Fired on the appropriate keyboard event */
  onInputKeyPress: PropTypes.func,
  /** Fired on the appropriate keyboard event */
  onInputKeyUp: PropTypes.func,
  /** Fired when the option trigger is focused */
  onOptionFocus: PropTypes.func,
  /** Fired when the option trigger is blurred */
  onOptionBlur: PropTypes.func,
  /** Fires when an option is changed/selected */
  onOptionChange: PropTypes.func,
  /** Fires when either the input or an option is changed */
  onChange: PropTypes.func,
  /** Fires when Enter is pressed on the input */
  onEnter: PropTypes.func,
  /** Fires when Escape is pressed on the input */
  onEscape: PropTypes.func,
  /** Fires when a value is added on multi-value fields */
  onAdd: PropTypes.func,
  /** Fires when a change is "saved" */
  onCommit: PropTypes.func,
  /** Fires on clearing or deleting a value */
  onDelete: PropTypes.func,
  /** Fires on discarding a value */
  onDiscard: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default EditableField
