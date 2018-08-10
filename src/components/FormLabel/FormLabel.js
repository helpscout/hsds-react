// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Context from './Context'
import HelpText from '../HelpText'
import Label from '../Label'
import classNames from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { FormLabelUI, FormLabelHelpTextUI } from './styles/FormLabel.css.js'

type Props = {
  children?: any,
  className?: string,
  for?: string,
  id?: string,
  label?: any,
  helpText: any,
}

type State = {
  id: string,
}

const uniqueID = createUniqueIDFactory('FormControl')

class FormLabel extends Component<Props, State> {
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
        <FormLabelUI className={componentClassName} {...getValidProps(rest)}>
          {labelMarkup}
          {helpTextMarkup}
          <div className="c-FromLabel__content">{children}</div>
        </FormLabelUI>
      </Context.Provider>
    )
  }
}

export default FormLabel
