// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'
import { FormGroupChoiceUI } from './styles/Choice.css.js'

type Props = {
  children?: any,
  className?: string,
}

class Choice extends Component<Props> {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-FormGroupChoice', className)

    return (
      <FormGroupChoiceUI className={componentClassName} {...rest}>
        {children}
      </FormGroupChoiceUI>
    )
  }
}

export default Choice
