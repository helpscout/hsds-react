// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { FormGroupChoiceUI } from './styles/Choice.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
  isResponsive: boolean,
}

class Choice extends Component<Props> {
  static defaultProps = {
    isResponsive: false,
  }

  render() {
    const { className, children, isResponsive, ...rest } = this.props

    const componentClassName = classNames(
      'c-FormGroupChoice',
      isResponsive && 'is-responsive',
      className
    )

    return (
      <FormGroupChoiceUI
        {...getValidProps(rest)}
        className={componentClassName}
      >
        {children}
      </FormGroupChoiceUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Choice)(Choice)

export default Choice
