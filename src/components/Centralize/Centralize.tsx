import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { CentralizeUI } from './styles/Centralize.css'
import { COMPONENT_KEY } from './Centralize.utils'

export interface Props {
  className?: string
  children?: any
}

export class Centralize extends React.PureComponent<Props> {
  static className = 'c-Centralize'

  getClassName() {
    const { className } = this.props

    return classNames(Centralize.className, className)
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <CentralizeUI {...getValidProps(rest)} className={this.getClassName()}>
        {children}
      </CentralizeUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Centralize)

export default PropConnectedComponent
