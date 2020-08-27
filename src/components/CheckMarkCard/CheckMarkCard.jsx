import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import Icon from '../Icon'
import Checkbox from '../Checkbox'
import VisuallyHidden from '../VisuallyHidden'
import { CheckMarkCardUI, MarkUI } from './CheckMarkCard.css'

const uniqueID = createUniqueIDFactory('CheckMarkCard')

export class CheckMarkCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.id || uniqueID(),
      cardChecked: props.checked,
    }

    this.checkMarkCardRef = React.createRef()
  }

  componentDidMount() {
    if (this.props.isFocused && this.inputNode) {
      this.checkMarkCardRef.current.classList.add('is-focused')
      this.inputNode.focus()
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        cardChecked: nextProps.checked,
      })
    }
  }

  getClassName() {
    const { className, disabled, isLocked } = this.props
    const { cardChecked } = this.state

    return classNames(
      'c-CheckMarkCard',
      className,
      cardChecked && !isLocked && 'is-checked',
      disabled && 'is-disabled',
      isLocked && 'is-locked'
    )
  }

  setInputNodeRef = node => {
    this.inputNode = node
    this.props.inputRef(node)
  }

  handleOnChange = (value, checked) => {
    this.setState({
      cardChecked: checked,
    })

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

  renderMark = () => {
    const { isLocked } = this.props
    const { cardChecked } = this.state
    let iconName
    let iconSize

    if (cardChecked) {
      iconName = 'checkmark'
      iconSize = '24'
    }
    // If the card is locked, it should take precedence even if the card
    // is checked from external props for some reason
    if (isLocked) {
      iconName = 'lock-closed'
      iconSize = '20'
    }

    // "Render" MarkUI below even if neither locked or checked with opacity 0
    // so we can animate the transition
    return (
      <MarkUI className="c-CheckMarkCard__mark" kind={iconName}>
        {iconName ? (
          <Icon
            className={`${iconName}-icon mark-icon`}
            name={iconName}
            size={iconSize}
          />
        ) : null}
      </MarkUI>
    )
  }

  render() {
    const {
      children,
      disabled,
      isLocked,
      label,
      maxWidth,
      height,
      value,
      ...rest
    } = this.props
    const { id, cardChecked } = this.state

    return (
      <CheckMarkCardUI
        {...rest}
        className={this.getClassName()}
        htmlFor={id}
        maxWidth={maxWidth}
        height={height}
        ref={this.checkMarkCardRef}
      >
        {this.renderMark()}
        <VisuallyHidden>
          <Checkbox
            checked={cardChecked}
            disabled={disabled || isLocked}
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
  inputRef: noop,
  isFocused: false,
  isLocked: false,
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
  /** Callback to obtain the <input> node. */
  inputRef: PropTypes.func,
  /** Whether the card should be focused */
  isFocused: PropTypes.bool,
  /** Give the card "locked" styles, it also disables it */
  isLocked: PropTypes.bool,
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
