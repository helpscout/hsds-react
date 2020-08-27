import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { getColor } from '../../styles/utilities/color'
import Icon from '../Icon'
import Checkbox from '../Checkbox'
import Tooltip from '../Tooltip'
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
    const { className, disabled, withStatus } = this.props
    const { cardChecked } = this.state

    return classNames(
      'c-CheckMarkCard',
      className,
      cardChecked && !Boolean(withStatus) && 'is-checked',
      disabled && 'is-disabled',
      Boolean(withStatus) && 'with-status',
      Boolean(withStatus) &&
        Boolean(withStatus.status) &&
        `is-${withStatus.status}`
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
    const { withStatus } = this.props
    const { cardChecked } = this.state
    let iconName
    let iconSize
    let color
    let tooltip

    if (cardChecked) {
      iconName = 'checkmark'
      iconSize = '24'
      color = getColor('blue.500')
    }
    // If the card has a status provided, it should take precedence even if the card
    // is checked from external props for some reason
    if (withStatus) {
      iconName = withStatus.iconName
      iconSize = withStatus.iconSize || '20'
      color = withStatus.color
      tooltip = withStatus.tooltipText
    }

    // "Render" MarkUI below even if neither withStatus or checked with opacity 0
    // so we can animate the transition
    return (
      <MarkUI
        className="c-CheckMarkCard__mark"
        color={color}
        markShown={Boolean(iconName)}
      >
        {Boolean(tooltip) ? (
          <Tooltip title={tooltip}>
            <Icon
              className={`${iconName}-icon mark-icon`}
              name={iconName}
              size={iconSize}
            />
          </Tooltip>
        ) : (
          <Icon
            className={`${iconName}-icon mark-icon`}
            name={iconName}
            size={iconSize}
          />
        )}
      </MarkUI>
    )
  }

  render() {
    const {
      children,
      disabled,
      label,
      maxWidth,
      height,
      value,
      withStatus,
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
        withStatus={withStatus}
        ref={this.checkMarkCardRef}
      >
        {this.renderMark()}
        <VisuallyHidden>
          <Checkbox
            checked={cardChecked}
            disabled={disabled || Boolean(withStatus)}
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
  /** Callback to obtain the html `input` node. */
  inputRef: PropTypes.func,
  /** Whether the card should be focused */
  isFocused: PropTypes.bool,
  /** Give the card special status styles, it also disables the input <br>
   * `status`: Not needed, but if provided it will add a class name of "is-YOUR_STATUS" to the component <br>
   * `iconName`: Icon to render <br>
   * `iconSize`: Size of the icon, default 20 <br>
   * `color`: color of the Card (border and background of the mark) <br>
   * `tooltipText`: If a tooltip is desired, provide the message here <br>
   */
  withStatus: PropTypes.shape({
    status: PropTypes.string,
    iconName: PropTypes.string,
    iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    tooltipText: PropTypes.string,
  }),
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
