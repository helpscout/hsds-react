// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames.ts'
import { CentralizeUI } from './styles/Centralize.css.js'

type Props = {
  className?: string,
  children?: any,
}

class Centralize extends Component<Props> {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-Centralize', className)

    return (
      <CentralizeUI className={componentClassName} {...rest}>
        {children}
      </CentralizeUI>
    )
  }
}

export default Centralize
