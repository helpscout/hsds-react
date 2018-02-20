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
import { stateTypes } from '../../constants/propTypes'
import { alignTypes, typeTypes } from './propTypes'

export const propTypes = {
  align: alignTypes,
  checked: PropTypes.bool,
  className: PropTypes.string,
  componentID: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  inputRef: PropTypes.func,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  state: stateTypes,
  type: typeTypes,
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
  inputRef: noop,
  type: 'checkbox',
  value: ''
}

const uniqueID = createUniqueIDFactory('Choice')

class Choice extends Component {
  constructor (props) {
    super()

    this.state = {
      checked: props.checked,
      id: props.id || uniqueID(props.componentID || 'Choice')
    }

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      checked: newProps.checked,
      id: newProps.id || this.state.id
    })
  }

  handleOnChange (value, checked) {
    this.setState({ checked })
    this.props.onChange(value, checked)
  }

  render () {
    const {
      align,
      children,
      className,
      componentID,
      disabled,
      helpText,
      hideLabel,
      id,
      inputRef,
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
    const { checked, id: choiceID } = this.state

    const componentClassName = classNames(
      'c-Choice',
      `is-${type}`,
      checked && 'is-selected',
      disabled && `is-disabled`,
      readOnly && `is-readonly`,
      state && `is-${state}`,
      className
    )

    const handleOnChange = this.handleOnChange

    let labelTextMarkup = hideLabel ? (
      <VisuallyHidden>{label}</VisuallyHidden>
    ) : (
      <Text muted={disabled}>{label}</Text>
    )

    const labelMarkup = children || label ? (
      <Flexy.Block>
        <span className='c-Choice__label-text'>
          {children || labelTextMarkup}
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
          <Flexy just='left' gap='sm' align={align}>
            <Flexy.Item>
              <span className='c-Choice__control'>
                <Input
                  align={align}
                  checked={checked}
                  disabled={disabled}
                  helpText={helpText}
                  id={choiceID}
                  inputRef={inputRef}
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
