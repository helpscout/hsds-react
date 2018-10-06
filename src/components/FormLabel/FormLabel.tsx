import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Context from './Context.js'
import HelpText from '../HelpText/index'
import Label from '../Label/index.js'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { createUniqueIDFactory } from '../../utilities/id.js'
import { FormLabelUI, FormLabelHelpTextUI } from './styles/FormLabel.css'
import { COMPONENT_KEY } from './utils'

export interface Props {
  children?: any
  className?: string
  for?: string
  id?: string
  label?: any
  helpText?: any
}

export interface State {
  id: string
}

const uniqueID = createUniqueIDFactory('FormControl')

class FormLabel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      id: props.for || props.id || uniqueID(),
    }
  }

  getContextProps = () => {
    const { id } = this.state

    return { id }
  }

  getLabelMarkup = () => {
    const { label } = this.props

    return (
      label && (
        <Label className="c-FormLabel__label" for={this.state.id}>
          {label}
        </Label>
      )
    )
  }

  getHelpTextMarkup = () => {
    const { helpText } = this.props

    return (
      helpText && (
        <FormLabelHelpTextUI className="c-FormLabel__helpTextWrapper">
          <HelpText isCompact className="c-FormLabel__helpText">
            {helpText}
          </HelpText>
        </FormLabelHelpTextUI>
      )
    )
  }

  render() {
    const {
      className,
      children,
      for: htmlFor,
      id: idProp,
      ...rest
    } = this.props

    const componentClassName = classNames('c-FormLabel', className)
    const labelMarkup = this.getLabelMarkup()
    const helpTextMarkup = this.getHelpTextMarkup()

    return (
      <Context.Provider value={this.getContextProps()}>
        <FormLabelUI {...getValidProps(rest)} className={componentClassName}>
          {labelMarkup}
          {helpTextMarkup}
          <div className="c-FromLabel__content">{children}</div>
        </FormLabelUI>
      </Context.Provider>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(FormLabel)

export default FormLabel
