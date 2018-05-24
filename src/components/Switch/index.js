import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'

export const propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  inputRef: PropTypes.func,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  size: PropTypes.oneOf(['lg', 'md', 'sm', '']),
  state: PropTypes.oneOf(['error', '']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
}

const defaultProps = {
  active: false,
  inputRef: noop,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  value: '',
}

const uniqueID = createUniqueIDFactory('Switch')

const classNamespace = 'c-Switch'
export const cx = {
  main: classNamespace,
  input: `${classNamespace}__input`,
  state: `${classNamespace}__state`,
  toggle: `${classNamespace}-toggle`,
}

class Switch extends Component {
  constructor(props) {
    super()
    this.state = {
      active: props.active,
      id: props.id || uniqueID(),
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange() {
    const { onChange, value } = this.props
    this.setState({ active: !this.state.active })
    onChange(value)
  }

  render() {
    const {
      active: propActive,
      className,
      id: propID,
      inputRef,
      name,
      onBlur,
      onChange,
      onFocus,
      size,
      state,
      value,
      ...rest
    } = this.props

    const { active, id } = this.state
    const handleOnChange = this.handleOnChange

    const componentClassName = classNames(
      cx.main,
      active && 'is-active',
      size && `${cx.main}--${size}`,
      state && `is-${state}`,
      className
    )

    const stateMarkup = state ? <div className={cx.state} /> : null

    return (
      <label className={componentClassName} {...rest} htmlFor={id}>
        <input
          aria-checked={active}
          className={cx.input}
          checked={active}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={handleOnChange}
          onFocus={onFocus}
          ref={inputRef}
          role="switch"
          type="checkbox"
          value={value}
        />
        <span className={cx.toggle} />
        {stateMarkup}
      </label>
    )
  }
}

Switch.propTypes = propTypes
Switch.defaultProps = defaultProps

export default Switch
