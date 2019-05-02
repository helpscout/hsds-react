import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Context from './ChoiceGroup.Context'
import FormGroup from '../FormGroup'
import FormLabelContext from '../FormLabel/Context'
import get from '../../utilities/get'
import { isComponentNamed, namespaceComponent } from '../../utilities/component'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { noop } from '../../utilities/other'
import { ChoiceGroupUI } from './styles/ChoiceGroup.css'
import { COMPONENT_KEY as RADIO_KEY } from '../Radio/Radio.utils'
import { COMPONENT_KEY as RADIOCARD_KEY } from '../RadioCard/RadioCard.utils'
import { COMPONENT_KEY } from './ChoiceGroup.utils'

type Props = {
  align: 'horizontal' | 'vertical'
  className: string
  choiceMaxWidth?: string | number
  children?: any
  isResponsive: boolean
  onBlur: (event: Event) => void
  onChange: (event: Event) => void
  onFocus: (event: Event) => void
  multiSelect: boolean
  name: string
  value: any
}

type State = {
  id: string
  multiSelect: boolean
  selectedValue: any
}

const uniqueID = createUniqueIDFactory('ChoiceGroup')

class ChoiceGroup extends React.PureComponent<Props, State> {
  static defaultProps = {
    align: 'vertical',
    isResponsive: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
  }

  multiSelect: boolean = true

  constructor(props: Props) {
    super(props)

    this.state = {
      id: uniqueID(),
      multiSelect: false,
      selectedValue: props.value ? [].concat(props.value) : [],
    }
  }

  componentWillReceiveProps(nextProps: Props) {
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
      multiSelect =
        !isComponentNamed(child, RADIO_KEY) &&
        !isComponentNamed(child, RADIOCARD_KEY)
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

  getMultiSelectValue(value: any, checked: boolean) {
    const { selectedValue } = this.state
    const valueIndex = selectedValue.indexOf(value)

    if (valueIndex < 0 && checked) {
      return selectedValue.concat(value)
    }

    return selectedValue.filter(v => v !== value)
  }

  handleOnChange = (value: any, checked: boolean) => {
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

  getIdFromContextProps = (props: any) => props.id || this.state.id

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
        {(props: Object) => (
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

namespaceComponent(COMPONENT_KEY)(ChoiceGroup)

export default propConnect(COMPONENT_KEY)(ChoiceGroup)
