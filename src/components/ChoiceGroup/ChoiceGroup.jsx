import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Context from './ChoiceGroup.Context'
import FormGroup from '../FormGroup'
import FormLabelContext from '../FormLabel/Context'
import get from '../../utilities/get'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { ChoiceGroupUI } from './ChoiceGroup.css'
import Radio from '../Radio'
import RadioCard from '../RadioCard'

const uniqueID = createUniqueIDFactory('ChoiceGroup')

class ChoiceGroup extends React.PureComponent {
  static propTypes = {
    align: PropTypes.oneOf(['horizontal', 'vertical']),
    className: PropTypes.string,
    choiceMaxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isResponsive: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    multiSelect: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.any,
  }
  static defaultProps = {
    align: 'vertical',
    isResponsive: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
  }

  multiSelect = true

  constructor(props) {
    super(props)

    this.state = {
      id: uniqueID(),
      multiSelect: false,
      selectedValue: props.value ? [].concat(props.value) : [],
    }
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else */
    if (nextProps.value !== this.props.value) {
      this.setState({
        selectedValue: [].concat(nextProps.value),
      })
    }
  }

  componentWillMount() {
    const child = this.props.children ? this.props.children[0] : false
    let multiSelect

    if (child) {
      multiSelect = child.type !== Radio && child.type !== RadioCard
    }
    // Override auto-setting based on children
    multiSelect =
      this.props.multiSelect !== undefined
        ? this.props.multiSelect
        : multiSelect

    multiSelect = !!multiSelect

    this.setState({ multiSelect })
    this.multiSelect = multiSelect
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
    const { multiSelect } = this.state
    const selectedValue = multiSelect
      ? this.getMultiSelectValue(value, checked)
      : value

    this.setState({ selectedValue })
    this.props.onChange(selectedValue)
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
      multiSelect: multiSelectSetting,
      name,
      ...rest
    } = this.props

    const { multiSelect } = this.state
    const isMultiSelect = multiSelectSetting || multiSelect

    const componentClassName = classNames(
      'c-ChoiceGroup',
      align && `is-align-${align}`,
      isMultiSelect && 'is-multi-select',
      isResponsive && 'is-responsive',
      className
    )

    const childrenMarkup = this.getChildrenMarkup()

    return (
      <FormLabelContext.Consumer>
        {props => (
          <Context.Provider value={this.getContextProps()}>
            <ChoiceGroupUI
              {...getValidProps(rest)}
              className={componentClassName}
              id={this.getIdFromContextProps(props)}
            >
              {childrenMarkup}
            </ChoiceGroupUI>
          </Context.Provider>
        )}
      </FormLabelContext.Consumer>
    )
  }
}

export default ChoiceGroup
