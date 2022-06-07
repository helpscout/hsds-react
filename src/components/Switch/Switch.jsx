import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import FormLabelContext from '../FormLabel/Context'
import VisuallyHidden from '../VisuallyHidden'
import classNames from 'classnames'
import { createUniqueIDFactory } from '@hsds/utils-id'
import {
  WrapperUI,
  SwitchUI,
  InputUI,
  StateUI,
  BackdropUI,
  ToggleUI,
} from './Switch.css'

function noop() {}
const uniqueID = createUniqueIDFactory('Switch')

class Switch extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked || false,
      isActive: false,
      isFocused: false,
      id: props.id || uniqueID(),
    }
    this.shouldAutoUpdateChecked = !Boolean(props.checked)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked,
      })
    }
  }

  handleOnChange = event => {
    const { onChange, value } = this.props
    const nextChecked = !this.state.checked

    if (this.shouldAutoUpdateChecked) {
      this.setState({ checked: nextChecked })
    }

    onChange(nextChecked, { event, value })
  }

  handleOnClick = event => {
    event.stopPropagation()
    if (this.props.isLoading) {
      event.preventDefault()
    } else {
      this.props.onClick(event)
    }
  }

  handleOnBlur = event => {
    this.setState({ isFocused: false })
    this.props.onBlur(event)
  }

  handleOnFocus = event => {
    this.setState({ isFocused: true })
    this.props.onFocus(event)
  }

  handleOnMouseDown = event => {
    this.setState({
      isActive: true,
    })
    this.props.onMouseDown(event)
  }

  handleOnMouseUp = event => {
    this.setState({
      isActive: false,
    })
    this.props.onMouseUp(event)
  }

  setRef = node => {
    this.props.inputRef(node)
    this.props.innerRef(node)
  }

  getIdFromContextProps = (props = { id: '' }) => {
    return props.id || this.state.id
  }

  getInputMarkup = (props = { id: '' }) => {
    const {
      checked: propActive,
      disabled,
      inputRef,
      innerRef,
      name,
      value,
      ...rest
    } = this.props
    const { checked } = this.state

    const id = this.getIdFromContextProps(props)

    return (
      <InputUI
        {...getValidProps(rest)}
        aria-checked={checked}
        className="c-Switch__input"
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={this.handleOnBlur}
        onChange={this.handleOnChange}
        onFocus={this.handleOnFocus}
        onClick={this.handleOnClick}
        ref={this.setRef}
        role="switch"
        type="checkbox"
        value={value}
      />
    )
  }

  render() {
    const {
      className,
      disabled,
      onBlur,
      onChange,
      onFocus,
      id,
      isLoading,
      labelOn,
      labelOff,
      size,
      state,
      value,
      ...rest
    } = this.props

    const { checked, isActive, isFocused } = this.state

    const shouldShowChecked = !isLoading && checked
    const shouldShowActive = !isLoading && isActive

    const componentClassName = classNames(
      'c-Switch',
      disabled && 'is-disabled',
      shouldShowChecked && 'is-checked',
      isLoading && 'is-loading',
      size && `is-${size}`,
      state && `is-${state}`,
      className
    )

    const backdropClassName = classNames(
      'c-Switch__backdrop',
      shouldShowChecked && 'is-checked',
      disabled && 'is-disabled',
      isFocused && 'is-focused',
      size && `is-${size}`
    )

    const toggleClassName = classNames(
      'c-Switch__toggle',
      shouldShowChecked && 'is-checked',
      shouldShowActive && 'is-active',
      isFocused && 'is-focused',
      isLoading && 'is-loading',
      size && `is-${size}`
    )

    const stateMarkup = state && <StateUI className="c-Switch__state" />
    const switchLabel = checked ? labelOn : labelOff

    return (
      <FormLabelContext.Consumer>
        {props => (
          <WrapperUI className="c-SwitchWrapper">
            <SwitchUI
              {...getValidProps(rest)}
              className={componentClassName}
              htmlFor={this.getIdFromContextProps(props)}
              onMouseDown={this.handleOnMouseDown}
              onMouseUp={this.handleOnMouseUp}
            >
              {this.getInputMarkup(props)}
              <BackdropUI className={backdropClassName}>
                <ToggleUI className={toggleClassName} />
              </BackdropUI>
              {stateMarkup}
              <VisuallyHidden>{switchLabel}</VisuallyHidden>
            </SwitchUI>
          </WrapperUI>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

Switch.defaultProps = {
  'data-cy': 'Switch',
  inputRef: noop,
  innerRef: noop,
  isLoading: false,
  labelOn: 'On',
  labelOff: 'Off',
  onBlur: noop,
  onChange: noop,
  onClick: noop,
  onFocus: noop,
  onMouseDown: noop,
  onMouseUp: noop,
  size: 'md',
  value: '',
}

Switch.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines if the component is checked. */
  checked: PropTypes.bool,
  /** Disable the component */
  disabled: PropTypes.bool,
  /** Sets a custom ID for the component. */
  id: PropTypes.string,
  /** Activates the loading state. */
  isLoading: PropTypes.bool,
  /** Callback to retrieve the `input` node. */
  inputRef: PropTypes.func,
  /** Callback to retrieve the `input` node. */
  innerRef: PropTypes.func,
  /** Name attribute for the component's `input` node. */
  name: PropTypes.string,
  /** Callback function when component blurs. */
  onBlur: PropTypes.func,
  /** Callback function when component `checked` changes. Returns switched state. */
  onChange: PropTypes.func,
  /** Callback function when component is clicked. */
  onClick: PropTypes.func,
  /** Callback function when component focuses. */
  onFocus: PropTypes.func,
  /** Adjusts the size of the component. */
  size: PropTypes.oneOf(['lg', 'md', 'sm', '']),
  /** Applies state-based styling. */
  state: PropTypes.oneOf(['error', '']),
  /** Value for the component. */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  /** Callback function on mouse down. */
  onMouseDown: PropTypes.func,
  /** Callback function on mouse up. */
  onMouseUp: PropTypes.func,
  labelOn: PropTypes.string,
  labelOff: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Switch
