import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { <%= name %>UI } from './<%= name %>.css'
import { COMPONENT_KEY } from './<%= name %>.utils'

export interface Props {
  className?: string,
  children?: any
}

export class <%= name %> extends React.PureComponent<Props> {
  static className = 'c-<%= name %>'

  getClassName() {
    const { className } = this.props
    return classNames(
      <%= name %>.className,
      className
    )
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <<%= name %>UI {...getValidProps(rest)} className={this.getClassName()}>
        {children}
      </<%= name %>UI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(<%= name %>)

export default PropConnectedComponent
