import * as React from 'react'
import Icon from '../Icon'
import ChoiceGroupContext from '../ChoiceGroup/ChoiceGroup.Context'
import { classNames } from '../../utilities/classNames'
import { includes } from '../../utilities/arrays'

import { createUniqueIDFactory } from '../../utilities/id'
import { isFunction, isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import Radio from '../Radio'
import {
  RadioCardUI,
  IconWrapperUI,
  FocusUI,
  ContentUI,
  HeadingUI,
} from './styles/RadioCard.css'

import { RadioCardProps, RadioCardState, InputEvent } from './RadioCard.types'

const uniqueID = createUniqueIDFactory('RadioCard')

class RadioCard extends React.PureComponent<RadioCardProps, RadioCardState> {
  static defaultProps = {
    checked: false,
    content: null,
    heading: null,
    icon: 'fab-chat',
    iconSize: 52,
    innerRef: noop,
    inputRef: noop,
    isFocused: false,
    maxWidth: null,
    onBlur: noop,
    onChange: noop,
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

  getContentMarkup = () => {
    const { content } = this.props

    if (!content) {
      return null
    }

    if (React.isValidElement(content)) {
      return content
    }

    if (isFunction(content)) {
      return React.createElement(content)
    }

    return <ContentUI className="c-RadioCard__content">{content}</ContentUI>
  }

  getHeadingMarkup = () => {
    const { heading } = this.props

    if (!heading) {
      return null
    }

    if (React.isValidElement(heading)) {
      return heading
    }

    if (isFunction(heading)) {
      return React.createElement(heading)
    }

    return <HeadingUI className="c-RadioCard__heading">{heading}</HeadingUI>
  }

  getIconMarkup = () => {
    const { icon, iconSize } = this.props

    if (React.isValidElement(icon)) {
      return icon
    }

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
    const {
      checked,
      className,
      content,
      heading,
      icon,
      maxWidth,
      title,
      value,
      ...rest
    } = this.props
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
      // @ts-ignore
      <RadioCardUI
        htmlFor={id}
        className={componentClassName}
        title={title}
        maxWidth={maxWidth}
      >
        <IconWrapperUI
          className={classNames(
            'c-RadioCard__iconWrapper',
            isChecked && 'is-checked'
          )}
        >
          {this.getIconMarkup()}
        </IconWrapperUI>
        {this.getHeadingMarkup()}
        {this.getContentMarkup()}
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

export default RadioCard
