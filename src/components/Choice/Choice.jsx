import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ChoiceInput from './Choice.Input'
import Flexy from '../Flexy'
import HelpText from '../HelpText'
import Text from '../Text'
import VisuallyHidden from '../VisuallyHidden'
import ChoiceGroupContext from '../ChoiceGroup/ChoiceGroup.Context'
import classNames from 'classnames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import {
  ChoiceLabelUI,
  ChoiceLabelTextUI,
  ChoiceHelpTextUI,
} from './Choice.css'

const uniqueID = createUniqueIDFactory('Choice')

class Choice extends React.PureComponent {
  state = {
    checked: this.props.checked,
    id: this.props.id || uniqueID(this.props.componentID),
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked,
      id: nextProps.id || this.state.id,
    })
  }

  handleOnChange = (value, checked) => {
    this.setState({ checked })

    this.props.onChange(value, checked)
  }

  handleOnEnter = (value, checked) => {
    this.setState({ checked })

    this.props.onEnter(value, checked)
  }

  handleOnBlur = event => {
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
    this.props.onFocus(event)
  }

  handleOnEnterWithContext = contextProps => {
    return (...args) => {
      this.handleOnEnter.apply(null, args)

      if (contextProps.onEnter) {
        contextProps.onEnter.apply(null, args)
      }
    }
  }

  handleOnBlurWithContext = contextProps => {
    return (...args) => {
      this.handleOnBlur.apply(null, args)

      if (contextProps.onBlur) {
        contextProps.onBlur.apply(null, args)
      }
    }
  }

  handleOnChangeWithContext = contextProps => {
    return (...args) => {
      if (contextProps.onChange) {
        contextProps.onChange.apply(null, args)
        this.props.onChange.apply(null, args)
      } else {
        this.handleOnChange.apply(null, args)
      }
    }
  }

  handleOnFocusWithContext = contextProps => {
    return (...args) => {
      this.handleOnFocus.apply(null, args)

      if (contextProps.onFocus) {
        contextProps.onFocus.apply(null, args)
      }
    }
  }

  getLabelMarkup = () => {
    const { children, disabled, hideLabel, label, stacked } = this.props

    if (!children && !label) {
      return null
    }

    const className = classNames(
      'c-Choice__label-text',
      stacked && 'is-stacked'
    )

    let labelTextMarkup = children
    if (!children) {
      labelTextMarkup = hideLabel ? (
        <VisuallyHidden>{label}</VisuallyHidden>
      ) : (
        <Text muted={disabled}>{label}</Text>
      )
    }

    const labelMarkup = (
      <ChoiceLabelTextUI className={className}>
        {labelTextMarkup}
      </ChoiceLabelTextUI>
    )

    if (stacked) {
      return labelMarkup
    }

    return <Flexy.Block>{labelMarkup}</Flexy.Block>
  }

  getHelpTextMarkup = () => {
    const { helpText, stacked, state } = this.props

    const className = classNames('c-Choice__help-text', stacked && 'is-stacked')

    return (
      helpText && (
        <ChoiceHelpTextUI className={className}>
          <HelpText state={state} muted>
            {helpText}
          </HelpText>
        </ChoiceHelpTextUI>
      )
    )
  }

  getInputMarkup = contextProps => {
    const {
      align,
      autoFocus,
      disabled,
      helpText,
      inputRef,
      innerRef,
      kind,
      name,
      readOnly,
      stacked,
      state,
      type,
      value,
      ...rest
    } = this.props

    const { checked, id: choiceID } = this.state

    const isChecked =
      (contextProps.selectedValue &&
        contextProps.selectedValue.includes(value)) ||
      checked ||
      false

    const inputProps = {
      ...getValidProps(rest),
      align,
      autoFocus,
      checked: isChecked,
      disabled,
      helpText,
      id: choiceID,
      inputRef,
      innerRef,
      kind,
      name: contextProps.name || name,
      onBlur: this.handleOnBlurWithContext(contextProps),
      onFocus: this.handleOnFocusWithContext(contextProps),
      onChange: this.handleOnChangeWithContext(contextProps),
      onEnter: this.handleOnEnterWithContext(contextProps),
      readOnly,
      state,
      type,
      value,
    }

    const labelMarkup = this.getLabelMarkup()

    const inputMarkup = (
      <span className="c-Choice__control">
        <ChoiceInput {...inputProps} />
      </span>
    )

    const inputLabelMarkup = stacked ? (
      <div className="c-Choice__stackedWrapper">
        {inputMarkup}
        {labelMarkup}
      </div>
    ) : (
      <Flexy just="left" gap="sm" align={align}>
        <Flexy.Item>{inputMarkup}</Flexy.Item>
        {labelMarkup}
      </Flexy>
    )

    return inputLabelMarkup
  }

  render() {
    const {
      align,
      autoFocus,
      children,
      className,
      componentID,
      disabled,
      helpText,
      hideLabel,
      id,
      inputRef,
      innerRef,
      isBlock,
      onBlur,
      onChange,
      onFocus,
      kind,
      label,
      name,
      readOnly,
      stacked,
      state,
      type,
      value,
      ...rest
    } = this.props
    const { checked, id: choiceID } = this.state
    const componentClassName = classNames(
      'c-Choice',
      `is-${type}`,
      checked && 'is-selected',
      disabled && 'is-disabled',
      isBlock && 'is-block',
      kind && `is-${kind}`,
      readOnly && 'is-readonly',
      stacked && 'is-stacked',
      state && `is-${state}`,
      className
    )

    const labelClassName = classNames(
      'c-Choice__label',
      checked && 'is-selected',
      disabled && 'is-disabled',
      isBlock && 'is-block',
      stacked && 'is-stacked'
    )

    return (
      <ChoiceGroupContext.Consumer>
        {contextProps => (
          <div {...getValidProps(rest)} className={componentClassName}>
            <ChoiceLabelUI htmlFor={choiceID} className={labelClassName}>
              {this.getInputMarkup(contextProps)}
              {stacked ? this.getHelpTextMarkup() : null}
            </ChoiceLabelUI>
            {!stacked ? this.getHelpTextMarkup() : null}
          </div>
        )}
      </ChoiceGroupContext.Consumer>
    )
  }
}

Choice.defaultProps = {
  autoFocus: false,
  checked: false,
  componentID: 'Choice',
  'data-cy': 'Choice',
  disabled: false,
  hideLabel: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onEnter: noop,
  inputRef: noop,
  innerRef: noop,
  isBlock: false,
  readOnly: false,
  type: 'checkbox',
  value: '',
}

Choice.propTypes = {
  align: PropTypes.oneOf(['top', '']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  checked: PropTypes.bool,
  isBlock: PropTypes.bool,
  innerRef: PropTypes.func,
  /** Automatically focuses the input. */
  autoFocus: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Namespace for the input ID. Default is `Choice`. */
  componentID: PropTypes.string,
  /** Disable the input. */
  disabled: PropTypes.bool,
  /** Displays text underneath input. */
  helpText: PropTypes.string,
  /** Hides the label with VisuallyHidden */
  hideLabel: PropTypes.bool,
  /** ID for the input. */
  id: PropTypes.string,
  /** Retrieves the `input` DOM node. */
  inputRef: PropTypes.func,
  /** Label for the input. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Name for the input. */
  name: PropTypes.string,
  /** Callback when the input is blurred. */
  onBlur: PropTypes.func,
  /** Callback when the input value is changed. */
  onChange: PropTypes.func,
  /** Callback when the input is focused. */
  onFocus: PropTypes.func,
  /** Callback when pressing enter whenthe input is focused. */
  onEnter: PropTypes.func,
  /** Disable editing of the input. */
  readOnly: PropTypes.bool,
  /** Stacks the input above the label. */
  stacked: PropTypes.bool,
  /** Change input to state color. */
  state: PropTypes.oneOf(['error', 'success', 'warning']),
  /** Determines the input type. `checkbox` or `radio`. */
  type: PropTypes.oneOf(['checkbox', 'radio']),
  /** The value of the input. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  /** Render a customized radio or a default */
  kind: PropTypes.oneOf(['default', 'custom']),
}

export default Choice
