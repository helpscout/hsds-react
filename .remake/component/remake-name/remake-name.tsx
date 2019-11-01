import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { <%= name %>Props } from './<%= name %>.types'
import { <%= name %>UI } from './styles/<%= name %>.css'
import { COMPONENT_KEY } from './<%= name %>.utils'

export class <%= name %> extends React.PureComponent<<%= name %>Props> {
  static className = 'c-<%= name %>'
  static defaultProps = {
    innerRef: noop
  }

  getClassName() {
    const { className } = this.props
    return classNames(
      <%= name %>.className,
      className
    )
  }

  render() {
    const { children, ref, ...rest } = this.props

    return (
      <<%= name %>UI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      >
        {children}
      </<%= name %>UI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(<%= name %>)

export default PropConnectedComponent
