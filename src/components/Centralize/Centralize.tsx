import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { CentralizeUI } from './styles/Centralize.css'
import { COMPONENT_KEY } from './Centralize.utils'

export interface Props {
  className?: string
  children?: any
  ref: (node: HTMLDivElement) => void
}

export class Centralize extends React.PureComponent<Props> {
  static defaultProps = {
    ref: noop,
  }

  static className = 'c-Centralize'

  getClassName() {
    const { className } = this.props

    return classNames(Centralize.className, className)
  }

  render() {
    const { children, ref, ...rest } = this.props

    return (
      <CentralizeUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={ref as any}
      >
        {children}
      </CentralizeUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Centralize)

export default PropConnectedComponent
