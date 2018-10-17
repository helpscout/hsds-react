// @flow
import React, { PureComponent as Component } from 'react'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id'
import { isFunction, isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import Radio from '../Radio'
import { RadioCardUI, IconWrapperUI, FocusUI } from './styles/RadioCard.css.js'
import { COMPONENT_KEY } from './utils'

type InputNode = HTMLInputElement
type InputEvent = SyntheticEvent<InputNode>

type Props = {
  checked: boolean,
  className?: string,
  icon: string | Function,
  iconSize: number,
  id?: string,
  inputRef: (node: InputNode) => void,
  innerRef: (node: InputNode) => void,
  isFocused: boolean,
  onBlur: (event: InputEvent) => void,
  onFocus: (event: InputEvent) => void,
  title?: string,
  onChange: (value: any) => void,
}

type State = {
  id: string,
  isFocused: boolean,
}

const uniqueID = createUniqueIDFactory('RadioCard')

class RadioCard extends Component<Props, State> {
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

  constructor(props: Props) {
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

  setInputNodeRef = (node: HTMLInputElement) => {
    this.inputNode = node
    this.props.inputRef(node)
    this.props.innerRef(node)
  }

  render() {
    const { className, checked, icon, title, ...rest } = this.props
    const { id, isFocused } = this.state

    const componentClassName = classNames(
      'c-RadioCard',
      checked && 'is-checked',
      isFocused && 'is-focused',
      className
    )

    return (
      <RadioCardUI htmlFor={id} className={componentClassName} title={title}>
        <IconWrapperUI
          className={classNames(
            'c-RadioCard__iconWrapper',
            checked && 'is-checked'
          )}
        >
          {this.getIconMarkup()}
        </IconWrapperUI>
        <Radio
          {...rest}
          checked={checked}
          kind="custom"
          id={id}
          inputRef={this.setInputNodeRef}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
        />
        {this.getFocusMarkup()}
      </RadioCardUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(RadioCard)

export default RadioCard
