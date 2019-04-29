import * as React from 'react'
import { ChoiceAlign, ChoiceType, ChoiceValue } from './Choice.types'
import { UIState } from '../../constants/types'
import Backdrop from '../Input/BackdropV2'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import {
  InputUI,
  InputInputUI,
  InputIconUI,
  InputPlaceholderUI,
  InputRadioUI,
} from './styles/Input.css'

type Props = {
  autoFocus: boolean
  align: ChoiceAlign
  children?: any
  checked: boolean
  className?: string
  disabled: boolean
  helpText?: string
  id?: string
  inputRef: (node: HTMLElement) => void
  innerRef: (node: HTMLElement) => void
  kind?: string
  onBlur: (event: Event) => void
  onChange: (event: Event, checked: boolean, id?: string) => void
  onFocus: (event: Event) => void
  name?: string
  readOnly: boolean
  state?: UIState
  type: ChoiceType
  value: ChoiceValue
}

type State = {
  isFocused: boolean
}

class Input extends React.PureComponent<Props, State> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    inputRef: noop,
    innerRef: noop,
    readOnly: false,
    type: 'checkbox',
    value: '',
  }

  state = {
    isFocused: false,
  }

  handleOnBlur = (event: Event) => {
    this.setState({
      isFocused: false,
    })
    this.props.onBlur(event)
  }

  handleOnChange = (event: Event) => {
    const { id, onChange, value } = this.props

    // TODO: fix typescript complains
    // @ts-ignore
    onChange(value, event.target.checked, id)
    // Prevents duplicate firing of onChange event
    event.stopPropagation()
  }

  handleOnFocus = (event: Event) => {
    this.setState({
      isFocused: true,
    })
    this.props.onFocus(event)
  }

  getIconMarkup = () => {
    const { checked, kind, type } = this.props
    const isRadio = type === 'radio'
    const isCustomRadio = kind === 'custom' && isRadio

    let iconMarkup

    if (isCustomRadio) {
      iconMarkup = checked ? (
        <Icon name="tick-small" size="18" />
      ) : (
        <InputPlaceholderUI className="c-ChoiceInput__placeholder" />
      )
    } else {
      const iconTypeMarkup = isRadio ? (
        <InputRadioUI className="c-ChoiceInput__radio" />
      ) : (
        <Icon name="tick-small" size="18" />
      )

      iconMarkup = checked && iconTypeMarkup
    }

    return (
      <InputIconUI className="c-ChoiceInput__icon">{iconMarkup}</InputIconUI>
    )
  }

  setInnerRef = (node: HTMLElement) => {
    this.props.inputRef(node)
    this.props.innerRef(node)
  }

  render() {
    const {
      align,
      autoFocus,
      className,
      checked,
      disabled,
      helpText,
      id,
      kind,
      readOnly,
      name,
      state,
      type,
      value,
    } = this.props

    const { isFocused } = this.state

    const componentClassName = classNames(
      'c-ChoiceInput',
      align && `is-${align}`,
      disabled && 'is-disabled',
      isFocused && 'is-focused',
      kind && `is-${kind}`,
      readOnly && 'is-readonly',
      state && `is-${state}`,
      type && `is-${type}`,
      className
    )

    const inputClassName = classNames(
      'c-InputField',
      'c-ChoiceInput__input',
      type && `is-${type}`
    )

    const isCustomRadio = kind === 'custom'

    const iconMarkup = this.getIconMarkup()

    return (
      <InputUI className={componentClassName}>
        <InputInputUI
          autoFocus={autoFocus}
          aria-describedby={helpText || undefined}
          aria-invalid={state !== 'error'}
          checked={checked}
          className={inputClassName}
          disabled={disabled}
          id={id}
          innerRef={this.setInnerRef}
          name={name}
          onBlur={this.handleOnBlur}
          onChange={this.handleOnChange}
          onFocus={this.handleOnFocus}
          readOnly={readOnly}
          type={type}
          value={value}
        />
        <Backdrop
          choiceKind={type}
          disabled={disabled}
          kind={kind}
          isFilled={checked}
          isFirst={false}
          isFocused={isFocused}
          isNotOnly={false}
          isLast={false}
          isSeamless={false}
          readOnly={readOnly}
          state={state}
          showFocus={!isCustomRadio}
        />
        {iconMarkup}
      </InputUI>
    )
  }
}

export default Input
