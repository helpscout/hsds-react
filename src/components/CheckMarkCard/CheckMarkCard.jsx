import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import Icon from '../Icon'
import Checkbox from '../Checkbox'
import VisuallyHidden from '../VisuallyHidden'
import { CheckMarkCardUI, CheckMarkUI } from './CheckMarkCard.css'

const uniqueID = createUniqueIDFactory('CheckMarkCard')

export class CheckMarkCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.id || uniqueID(),
    }

    this.checkMarkCardRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.isFocused && this.inputNode) {
      this.checkMarkCardRef.current.classList.add('is-focused')
      this.inputNode.focus()
    }
  }

  getClassName() {
    const { className, checked, disabled } = this.props

    return classNames(
      'c-CheckMarkCard',
      className,
      checked && 'is-checked',
      disabled && 'is-disabled'
    )
  }

  setInputNodeRef = node => {
    this.inputNode = node
    this.props.inputRef(node)
    this.props.innerRef(node)
  }

  handleOnChange = (value, checked) => {
    if (checked) {
      this.checkMarkCardRef.current.classList.add('is-checked')
    } else {
      this.checkMarkCardRef.current.classList.remove('is-checked')
    }

    this.props.onChange(value, checked)
  }

  handleOnBlur = event => {
    this.checkMarkCardRef.current.classList.remove('is-focused')
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
    this.checkMarkCardRef.current.classList.add('is-focused')
    this.props.onFocus(event)
  }

  render() {
    const {
      checked,
      children,
      disabled,
      label,
      maxWidth,
      height,
      value,
      ...rest
    } = this.props
    const { id } = this.state

    return (
      <CheckMarkCardUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        htmlFor={id}
        maxWidth={maxWidth}
        height={height}
        ref={this.checkMarkCardRef}
      >
        <CheckMarkUI>
          <Icon className="checkmark-icon" name="checkmark" size="24" />
        </CheckMarkUI>
        <VisuallyHidden>
          <Checkbox
            checked={checked}
            disabled={disabled}
            id={id}
            inputRef={this.setInputNodeRef}
            label={label || value}
            onBlur={this.handleOnBlur}
            onFocus={this.handleOnFocus}
            onChange={this.handleOnChange}
            value={value}
          />
        </VisuallyHidden>
        {children}
      </CheckMarkCardUI>
    )
  }
}

CheckMarkCard.defaultProps = {
  checked: false,
  'data-cy': 'CheckMarkCard',
  innerRef: noop,
  inputRef: noop,
  isFocused: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
}

CheckMarkCard.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines if the card is checked. */
  checked: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Determines if the card is disabled. */
  disabled: PropTypes.bool,
  /** ID for the input. */
  id: PropTypes.string,
  /** Whether the card should be focused */
  isFocused: PropTypes.bool,
  /** Set the height of the Card. */
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  /** Set the max width of the Card. */
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
  /** The value of the input. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export default CheckMarkCard
