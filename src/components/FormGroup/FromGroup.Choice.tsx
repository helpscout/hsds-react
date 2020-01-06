import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { FormGroupChoiceUI } from './styles/Choice.css'
import { COMPONENT_KEY } from './FromGroup.utils'

type Props = {
  children?: any
  className?: string
  isResponsive: boolean
  maxWidth?: string | number
  style: Object
}

class Choice extends React.PureComponent<Props> {
  static defaultProps = {
    isResponsive: false,
    style: {},
  }

  static displayName = 'FormGroupChoice'

  render() {
    const {
      className,
      children,
      isResponsive,
      maxWidth,
      style,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-FormGroupChoice',
      isResponsive && 'is-responsive',
      className
    )

    const componentStyle = {
      maxWidth,
      ...style,
    }

    return (
      <FormGroupChoiceUI
        {...getValidProps(rest)}
        className={componentClassName}
        style={componentStyle}
      >
        {children}
      </FormGroupChoiceUI>
    )
  }
}

export default Choice
