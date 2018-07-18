import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import FormGroup from '../FormGroup'
import { includes } from '../../utilities/arrays'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { valueTypes } from './propTypes'

export const propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  multiSelect: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.arrayOf(valueTypes), valueTypes]),
}

const defaultProps = {
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
}

const uniqueID = createUniqueIDFactory('ChoiceGroup')

class ChoiceGroup extends Component {
  constructor(props) {
    super()
    this.state = {
      id: uniqueID(),
      selectedValue: props.value ? [].concat(props.value) : [],
    }
    this.multiSelect = true
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentWillMount() {
    const child = this.props.children ? this.props.children[0] : false
    let multiSelect

    if (child && child.type && child.type.name) {
      multiSelect = child.type.name.toLowerCase() !== 'radio' // false for radio
    }
    // Override auto-setting based on children
    multiSelect =
      this.props.multiSelect !== undefined
        ? this.props.multiSelect
        : multiSelect

    this.setState({ multiSelect })
    this.multiSelect = multiSelect
  }

  getMultiSelectValue(value) {
    const { selectedValue } = this.state
    const valueIndex = selectedValue.indexOf(value)

    if (valueIndex < 0) {
      return selectedValue.concat(value)
    }

    selectedValue.splice(valueIndex, 1)
    return selectedValue
  }

  handleOnChange(value, checked) {
    if (typeof value === 'object' && value.target) return

    const { multiSelect } = this.state
    const selectedValue = multiSelect
      ? this.getMultiSelectValue(value)
      : [value]

    this.setState({ selectedValue })
    this.props.onChange(selectedValue)
  }

  render() {
    const {
      className,
      children,
      onBlur,
      onFocus,
      multiSelect: multiSelectSetting,
      name,
      ...rest
    } = this.props
    const { id, multiSelect, selectedValue } = this.state

    const componentClassName = classNames(
      'c-ChoiceGroup',
      (multiSelectSetting || multiSelect) && 'is-multi-select',
      className
    )
    const handleOnChange = this.handleOnChange

    const choiceMarkup = children
      ? React.Children.map(children, (child, index) => {
          return (
            <FormGroup.Choice key={`${id}-${index}`}>
              {React.cloneElement(child, {
                checked: includes(selectedValue, child.props.value),
                onBlur,
                onChange: handleOnChange,
                onFocus,
                name,
              })}
            </FormGroup.Choice>
          )
        })
      : null

    return (
      <div className={componentClassName} id={id} {...rest}>
        {choiceMarkup}
      </div>
    )
  }
}

ChoiceGroup.propTypes = propTypes
ChoiceGroup.defaultProps = defaultProps

export default ChoiceGroup
