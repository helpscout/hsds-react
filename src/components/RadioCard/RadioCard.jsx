import React from 'react'
import PropTypes from 'prop-types'
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
} from './RadioCard.css'

const uniqueID = createUniqueIDFactory('RadioCard')

class RadioCard extends React.PureComponent {
  defaultIcon = 'fab-chat'

  constructor(props) {
    super(props)

    this.state = {
      id: props.id || uniqueID(),
      isFocused: props.isFocused,
    }
  }

  handleOnBlur = event => {
    this.setState({
      isFocused: false,
    })
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
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

  setInputNodeRef = node => {
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

RadioCard.defaultProps = {
  checked: false,
  'data-cy': 'RadioCard',
  icon: 'fab-chat',
  iconSize: 52,
  innerRef: noop,
  inputRef: noop,
  isFocused: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
}

RadioCard.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines of the `radio` is checked. */
  checked: PropTypes.bool,
  /** Optional content to render. */
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Optional heading to render. */
  heading: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
  /** Icon to render. Can be the name of an `Icon` or a component */
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
  /** Size to render the `Icon` */
  iconSize: PropTypes.number,
  /** ID for the input. */
  id: PropTypes.string,
  innerRef: PropTypes.func,
  inputRef: PropTypes.func,
  /** Whether the radiocard should be focused */
  isFocused: PropTypes.bool,
  /** Set the max width of the RadioCard. */
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  /** Callback when the input is blurred. */
  onBlur: PropTypes.func,
  /** Callback when the input value is changed. */
  onChange: PropTypes.func,
  /** Callback when the input is focused. */
  onFocus: PropTypes.func,
  /** HTML title text for the component. */
  title: PropTypes.string,
  /** Value of the input */
  value: PropTypes.string,
}

export default RadioCard
