// @flow
import type { ChoiceAlign, ChoiceType, ChoiceValue } from './types'
import type { UIState } from '../../constants/types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Input from './Input'
import Flexy from '../Flexy'
import HelpText from '../HelpText'
import Text from '../Text'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import {
  ChoiceUI,
  ChoiceLabelUI,
  ChoiceHelpTextUI,
} from './styles/Choice.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  align: ChoiceAlign,
  children?: any,
  checked: boolean,
  className?: string,
  componentID: string,
  disabled: boolean,
  helpText?: string,
  hideLabel: boolean,
  id?: string,
  inputRef: (node: HTMLElement) => void,
  kind?: string,
  label?: string,
  onChange: (event: Event, checked: boolean) => void,
  name?: string,
  readOnly: boolean,
  state?: UIState,
  type: ChoiceType,
  value: ChoiceValue,
}

type State = {
  checked: boolean,
  id: string,
}

const uniqueID = createUniqueIDFactory('Choice')

class Choice extends Component<Props, State> {
  static defaultProps = {
    componentID: 'Choice',
    disabled: false,
    hideLabel: false,
    onChange: noop,
    inputRef: noop,
    readOnly: false,
    type: 'checkbox',
    value: '',
  }

  constructor(props: Props) {
    super()

    this.state = {
      checked: props.checked,
      id: props.id || uniqueID(props.componentID),
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      checked: nextProps.checked,
      id: nextProps.id || this.state.id,
    })
  }

  handleOnChange = (value: ChoiceValue, checked: boolean) => {
    this.setState({ checked })
    this.props.onChange(value, checked)
  }

  getLabelMarkup = () => {
    const { children, disabled, hideLabel, label } = this.props

    let labelTextMarkup = hideLabel ? (
      <VisuallyHidden>{label}</VisuallyHidden>
    ) : (
      <Text muted={disabled}>{label}</Text>
    )

    return (
      (children || label) && (
        <Flexy.Block>
          <span className="c-Choice__label-text">
            {children || labelTextMarkup}
          </span>
        </Flexy.Block>
      )
    )
  }

  getHelpTextMarkup = () => {
    const { helpText, state } = this.props

    return (
      helpText && (
        <ChoiceHelpTextUI className="c-Choice__help-text">
          <HelpText state={state} muted>
            {helpText}
          </HelpText>
        </ChoiceHelpTextUI>
      )
    )
  }

  render() {
    const {
      align,
      children,
      className,
      componentID,
      disabled,
      helpText,
      hideLabel,
      id,
      inputRef,
      kind,
      label,
      name,
      readOnly,
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
      kind && `is-${kind}`,
      readOnly && 'is-readonly',
      state && `is-${state}`,
      className
    )

    const labelMarkup = this.getLabelMarkup()
    const helpTextMarkup = this.getHelpTextMarkup()

    const inputProps = {
      align,
      checked,
      disabled,
      helpText,
      id: choiceID,
      inputRef,
      kind,
      name,
      onChange: this.handleOnChange,
      readOnly,
      state,
      type,
      value,
    }

    const labelClassName = classNames(
      'c-Choice__label',
      disabled && 'is-disabled'
    )

    return (
      <ChoiceUI {...getValidProps(rest)} className={componentClassName}>
        <ChoiceLabelUI htmlFor={choiceID} className={labelClassName}>
          <Flexy just="left" gap="sm" align={align}>
            <Flexy.Item>
              <span className="c-Choice__control">
                <Input {...inputProps} />
              </span>
            </Flexy.Item>
            {labelMarkup}
          </Flexy>
        </ChoiceLabelUI>
        {helpTextMarkup}
      </ChoiceUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Choice)

export default Choice
