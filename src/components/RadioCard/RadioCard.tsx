import * as React from 'react'
import Icon from '../Icon'
import ChoiceGroupContext from '../ChoiceGroup/ChoiceGroup.Context'
import { classNames } from '../../utilities/classNames'
import { includes } from '../../utilities/arrays'
import { namespaceComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { isFunction, isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import Radio from '../Radio'
import { RadioCardUI, IconWrapperUI, FocusUI } from './styles/RadioCard.css'
import { COMPONENT_KEY } from './RadioCard.utils'
import { RadioCardProps, RadioCardState, InputEvent } from './RadioCard.types'

const uniqueID = createUniqueIDFactory('RadioCard')

class RadioCard extends React.PureComponent<RadioCardProps, RadioCardState> {
  static defaultProps = {
    checked: false,
    onChange: noop,
    icon: 'fab-chat',
    iconSize: 52,
    inputRef: noop,
    innerRef: noop,
    isFocused: false,
    onBlur: noop,
    onFocus: noop,
  }

  defaultIcon: string = 'fab-chat'
  inputNode: HTMLInputElement

  constructor(props: RadioCardProps) {
    super(props)

    this.state = {
      id: props.id || uniqueID(),
      isFocused: props.isFocused,
    }
  }

  handleOnBlur = (event: InputEvent) => {
    this.setState({
      isFocused: false,
    })
    this.props.onBlur(event)
  }

  handleOnFocus = (event: InputEvent) => {
    this.showFocus()
    this.props.onFocus(event)
  }

  showFocus = () => {
    this.setState({
      isFocused: true,
    })
  }

  getIconMarkup = () => {
    const { icon, iconSize } = this.props

    if (isFunction(icon)) {
      return React.createElement(icon)
    }

    const iconName = isString(icon) ? icon : this.defaultIcon

    return (
      <Icon className="c-RadioCard__icon" name={iconName} size={iconSize} />
    )
  }

  getFocusMarkup = () => {
    const { isFocused } = this.state

    return isFocused && <FocusUI className="c-RadioCard__focus" />
  }

  getCardMarkup = contextProps => {
    const { className, checked, icon, title, value, ...rest } = this.props
    const { id, isFocused } = this.state

    const isChecked =
      (contextProps.selectedValue &&
        includes(contextProps.selectedValue, value)) ||
      checked

    const componentClassName = classNames(
      'c-RadioCard',
      isChecked && 'is-checked',
      isFocused && 'is-focused',
      className
    )

    return (
      <RadioCardUI htmlFor={id} className={componentClassName} title={title}>
        <IconWrapperUI
          className={classNames(
            'c-RadioCard__iconWrapper',
            isChecked && 'is-checked'
          )}
        >
          {this.getIconMarkup()}
        </IconWrapperUI>
        <Radio
          {...rest}
          checked={isChecked}
          kind="custom"
          id={id}
          inputRef={this.setInputNodeRef}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
          value={value}
        />
        {this.getFocusMarkup()}
      </RadioCardUI>
    )
  }

  setInputNodeRef = (node: HTMLInputElement) => {
    this.inputNode = node
    this.props.inputRef(node)
    this.props.innerRef(node)
  }

  render() {
    return (
      <ChoiceGroupContext.Consumer>
        {this.getCardMarkup}
      </ChoiceGroupContext.Consumer>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(RadioCard)

export default RadioCard
