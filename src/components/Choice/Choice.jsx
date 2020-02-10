import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Input from './Choice.Input'
import Flexy from '../Flexy'
import HelpText from '../HelpText'
import Text from '../Text'
import VisuallyHidden from '../VisuallyHidden'
import ChoiceGroupContext from '../ChoiceGroup/ChoiceGroup.Context'
import { includes } from '../../utilities/arrays'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'

import { noop } from '../../utilities/other'
import {
  ChoiceLabelUI,
  ChoiceLabelTextUI,
  ChoiceHelpTextUI,
} from './Choice.css'

const uniqueID = createUniqueIDFactory('Choice')

class Choice extends React.PureComponent {
  static propTypes = {
    align: PropTypes.oneOf(['top', '']),
    autoFocus: PropTypes.bool,
    checked: PropTypes.bool,
    className: PropTypes.string,
    componentID: PropTypes.string,
    disabled: PropTypes.bool,
    helpText: PropTypes.string,
    hideLabel: PropTypes.bool,
    id: PropTypes.string,
    isBlock: PropTypes.bool,
    inputRef: PropTypes.func,
    innerRef: PropTypes.func,
    kind: PropTypes.string,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    name: PropTypes.string,
    readOnly: PropTypes.bool,
    stacked: PropTypes.bool,
    state: PropTypes.string,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
  }

  static defaultProps = {
    autoFocus: false,
    checked: false,
    componentID: 'Choice',
    disabled: false,
    hideLabel: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    inputRef: noop,
    innerRef: noop,
    isBlock: false,
    readOnly: false,
    type: 'checkbox',
    value: '',
  }

  state = {
    checked: this.props.checked,
    id: this.props.id || uniqueID(this.props.componentID),
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked,
      id: nextProps.id || this.state.id,
    })
  }

  handleOnChange = (value, checked) => {
    this.setState({ checked })

    this.props.onChange(value, checked)
  }

  handleOnBlur = event => {
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
    this.props.onFocus(event)
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
        includes(contextProps.selectedValue, value)) ||
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
      readOnly,
      state,
      type,
      value,
    }

    const labelMarkup = this.getLabelMarkup()

    const inputMarkup = (
      <span className="c-Choice__control">
        <Input {...inputProps} />
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

export default Choice
