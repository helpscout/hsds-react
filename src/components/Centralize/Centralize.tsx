import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { CentralizeUI } from './styles/Centralize.css'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLDivElement) => void
}

export class Centralize extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
  }

  static className = 'c-Centralize'

  getClassName() {
    const { className } = this.props

    return classNames(Centralize.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <CentralizeUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef as any}
      >
        {children}
      </CentralizeUI>
    )
  }
}

export default Centralize
