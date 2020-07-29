import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import equal from 'fast-deep-equal'
import ChoiceGroupContext from './ChoiceGroup.Context'
import FormGroup from '../FormGroup'
import FormLabelContext from '../FormLabel/Context'
import get from '../../utilities/get'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { ChoiceGroupUI } from './ChoiceGroup.css'

const uniqueID = createUniqueIDFactory('ChoiceGroup')

class ChoiceGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: uniqueID(),
      selectedValue: props.value ? [].concat(props.value) : [],
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.value === this.props.value &&
      equal(nextState.selectedValue, this.state.selectedValue)
    ) {
      return false
    }

    return true
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        selectedValue: [].concat(nextProps.value),
      })
    }
  }

  getMultiSelectValue(value, checked) {
    const { selectedValue } = this.state
    const valueIndex = selectedValue.indexOf(value)

    if (valueIndex < 0 && checked) {
      return selectedValue.concat(value)
    }

    return selectedValue.filter(v => v !== value)
  }

  handleOnChange = (value, checked) => {
    const { multiSelect, onChange } = this.props
    const selectedValue = multiSelect
      ? this.getMultiSelectValue(value, checked)
      : [value]

    this.setState({ selectedValue })
    onChange(selectedValue)
  }

  getContextProps = () => {
    const { onBlur, onFocus, name } = this.props
    const { selectedValue } = this.state

    return {
      onBlur,
      onChange: this.handleOnChange,
      onFocus,
      name,
      selectedValue,
    }
  }

  getChildrenMarkup = () => {
    const { isResponsive, choiceMaxWidth, children } = this.props
    const { id } = this.state

    return (
      children &&
      React.Children.map(children, (child, index) => {
        const key = get(child, 'props.id') || `${id}-${index}`

        return (
          <FormGroup.Choice
            key={key}
            maxWidth={choiceMaxWidth}
            isResponsive={isResponsive}
          >
            {child}
          </FormGroup.Choice>
        )
      })
    )
  }

  getIdFromContextProps = props => props.id || this.state.id

  render() {
    const {
      align,
      className,
      children,
      isResponsive,
      onBlur,
      onChange,
      onFocus,
      multiSelect,
      name,
      ...rest
    } = this.props
    const componentClassName = classNames(
      'c-ChoiceGroup',
      align && `is-align-${align}`,
      multiSelect && 'is-multi-select',
      isResponsive && 'is-responsive',
      className
    )
    const childrenMarkup = this.getChildrenMarkup()

    return (
      <FormLabelContext.Consumer>
        {props => (
          <ChoiceGroupContext.Provider value={this.getContextProps()}>
            <ChoiceGroupUI
              {...getValidProps(rest)}
              className={componentClassName}
              id={this.getIdFromContextProps(props)}
            >
              {childrenMarkup}
            </ChoiceGroupUI>
          </ChoiceGroupContext.Provider>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

ChoiceGroup.defaultProps = {
  align: 'vertical',
  'data-cy': 'ChoiceGroup',
  isResponsive: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  multiSelect: true,
}

ChoiceGroup.propTypes = {
  align: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Set the max-width for the child `Choice` components. */
  choiceMaxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Disable the input. */
  disabled: PropTypes.bool,
  /** Enables responsive styling. */
  isResponsive: PropTypes.bool,
  /** Name for the inputs. */
  name: PropTypes.string,
  /** Callback when an input is blurred. */
  onBlur: PropTypes.func,
  /** Callback when an input value is changed. */
  onChange: PropTypes.func,
  /** Callback when an input is focused. */
  onFocus: PropTypes.func,
  /** The default value of input group. */
  value: PropTypes.any,
  /** Allow multiple choice selection */
  multiSelect: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ChoiceGroup
