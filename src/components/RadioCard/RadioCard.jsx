import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { createUniqueIDFactory } from '../../utilities/id'
import { isFunction, isString } from '../../utilities/is'
import Icon from '../Icon'
import Radio from '../Radio'
import {
  RadioCardUI,
  IconWrapperUI,
  ContentUI,
  HeadingUI,
} from './RadioCard.css'

function noop() {}
const uniqueID = createUniqueIDFactory('RadioCard')
const DEFAULT_ICON = 'fab-chat'

class RadioCard extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      id: props.id || uniqueID(),
    }

    this.radioCardRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.isFocused && this.inputNode) {
      this.radioCardRef.current.classList.add('is-focused')
      this.inputNode.focus()
    }
  }

  getClassName() {
    const { className, checked, heading } = this.props

    return classNames(
      'c-RadioCard',
      checked && 'is-checked',
      heading && 'with-heading',
      className
    )
  }

  handleOnChange = (value, checked) => {
    if (checked) {
      this.radioCardRef.current.classList.add('is-checked')
    } else {
      this.radioCardRef.current.classList.remove('is-checked')
    }

    this.props.onChange(value, checked)
  }

  handleOnBlur = event => {
    this.radioCardRef.current.classList.remove('is-focused')
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
    this.radioCardRef.current.classList.add('is-focused')
    this.props.onFocus(event)
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

    const iconName = isString(icon) ? icon : DEFAULT_ICON

    return (
      <Icon className="c-RadioCard__icon" name={iconName} size={iconSize} />
    )
  }

  setInputNodeRef = node => {
    this.inputNode = node
    this.props.inputRef(node)
  }

  render() {
    const {
      checked,
      className,
      content,
      heading,
      icon,
      isFocused,
      height,
      maxWidth,
      iconSize,
      title,
      value,
      ...rest
    } = this.props
    const { id } = this.state

    return (
      <RadioCardUI
        htmlFor={id}
        className={this.getClassName()}
        title={title}
        withHeading={Boolean(heading)}
        withContent={Boolean(content)}
        maxWidth={maxWidth}
        height={height}
        ref={this.radioCardRef}
      >
        <IconWrapperUI
          className={classNames(
            'c-RadioCard__iconWrapper',
            checked && 'is-checked'
          )}
          withHeading={Boolean(heading)}
          withContent={Boolean(content)}
          iconSize={iconSize}
        >
          {this.getIconMarkup()}
        </IconWrapperUI>
        {this.getHeadingMarkup()}
        {this.getContentMarkup()}
        <Radio
          {...rest}
          checked={checked}
          kind="custom"
          id={id}
          inputRef={this.setInputNodeRef}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
          value={value}
        />
      </RadioCardUI>
    )
  }
}

RadioCard.defaultProps = {
  checked: false,
  'data-cy': 'RadioCard',
  icon: 'fab-chat',
  iconSize: 52,
  inputRef: noop,
  isFocused: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
}

RadioCard.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines if the `radio` is checked. */
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
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** ID for the input. */
  id: PropTypes.string,
  /** Callback to obtain the <input> node. */
  inputRef: PropTypes.func,
  /** Whether the radiocard should be focused */
  isFocused: PropTypes.bool,
  /** Set the height of the RadioCard. */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
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
