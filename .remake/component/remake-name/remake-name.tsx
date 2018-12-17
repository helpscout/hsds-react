import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { <%= name %>UI } from './<%= name %>.css'
import { COMPONENT_KEY } from './<%= name %>.utils'

export interface Props {
  className?: string,
  children?: any,
  innerRef: (node: HTMLElement) => void,
}

export class <%= name %> extends React.PureComponent<Props> {
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
    const { children, innerRef, ...rest } = this.props

    return (
      <<%= name %>UI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        {children}
      </<%= name %>UI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(<%= name %>)

export default PropConnectedComponent
