import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'
import Flexy from '../Flexy'
import HelpText from '../HelpText'
import Text from '../Text'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'

export const propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  state: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired
}

const defaultProps = {
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  type: 'checkbox',
  value: ''
}

const uniqueID = createUniqueIDFactory('Choice')

class Choice extends Component {
  constructor (props) {
    super()
    this.state = {
      checked: props.checked
    }
  }

  handleOnChange (value, checked) {
    this.setState({ checked })
    this.props.onChange(value)
  }

  render () {
    const {
      className,
      disabled,
      helpText,
      hideLabel,
      label,
      onBlur,
      onFocus,
      name,
      readOnly,
      state,
      type,
      value,
      ...rest
    } = this.props
    const { checked } = this.state

    const choiceID = uniqueID()

    const componentClassName = classNames(
      'c-Choice',
      `is-${type}`,
      checked && 'is-selected',
      disabled && `is-disabled`,
      readOnly && `is-readonly`,
      state && `is-${state}`,
      className
    )

    const handleOnChange = this.handleOnChange.bind(this)

    const labelTextMarkup = hideLabel ? (
      <VisuallyHidden>{label}</VisuallyHidden>
    ) : (
      <Text muted={disabled}>{label}</Text>
    )

    const labelMarkup = label ? (
      <Flexy.Block>
        <span className='c-Choice__label-text'>
          {labelTextMarkup}
        </span>
      </Flexy.Block>
    ) : null

    const helpTextMarkup = helpText
      ? <div className='c-Choice__help-text'>
        <HelpText state={state} muted>
          {helpText}
        </HelpText>
      </div>
      : null

    return (
      <div className={componentClassName} {...rest}>
        <label htmlFor={choiceID} className='c-Choice__label'>
          <Flexy align='left' gap='sm'>
            <Flexy.Item>
              <span className='c-Choice__control'>
                <Input
                  checked={checked}
                  disabled={disabled}
                  helpText={helpText}
                  id={choiceID}
                  name={name}
                  onBlur={onBlur}
                  onChange={handleOnChange}
                  onFocus={onFocus}
                  readOnly={readOnly}
                  state={state}
                  type={type}
                  value={value}
                />
              </span>
            </Flexy.Item>
            {labelMarkup}
          </Flexy>
        </label>
        {helpTextMarkup}
      </div>
    )
  }
}

Choice.propTypes = propTypes
Choice.defaultProps = defaultProps

export default Choice
