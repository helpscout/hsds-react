import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Context from './Context'
import HelpText from '../HelpText'
import Label from '../Label'
import { classNames } from '../../utilities/classNames'
import { createUniqueIDFactory } from '../../utilities/id'
import { FormLabelUI, FormLabelHelpTextUI } from './FormLabel.css'

const uniqueID = createUniqueIDFactory('FormControl')

class FormLabel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.for || props.id || uniqueID(),
    }
  }

  static defaultProps = {
    isInline: false,
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
      isInline,
      for: htmlFor,
      id: idProp,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-FormLabel',
      isInline && 'is-inline',
      className
    )
    const labelMarkup = this.getLabelMarkup()
    const helpTextMarkup = this.getHelpTextMarkup()

    return (
      <Context.Provider value={this.getContextProps()}>
        <FormLabelUI
          {...getValidProps(rest)}
          className={componentClassName}
          isHelpTextPresent={!!helpTextMarkup}
          isInline={isInline}
        >
          <div className="c-FormLabel__label">
            {labelMarkup}
            {helpTextMarkup}
          </div>
          <div className="c-FormLabel__content">{children}</div>
        </FormLabelUI>
      </Context.Provider>
    )
  }
}

FormLabel.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  for: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.any,
  helpText: PropTypes.any,
  isInline: PropTypes.bool,
}

FormLabel.defaultProps = {
  'data-cy': 'FormLabel',
}

export default FormLabel
