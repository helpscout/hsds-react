import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Item from './Nav.Item'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { NavUI, ListUI } from './styles/Nav.css'
import { COMPONENT_KEY } from './Nav.utils'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export class Nav extends React.Component<Props> {
  static className = 'c-Nav'
  static defaultProps = {
    innerRef: noop,
  }

  static Item = Item

  getClassName() {
    const { className } = this.props
    return classNames(Nav.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <NavUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      >
        <ListUI className="c-NavList">{children}</ListUI>
      </NavUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY, { pure: false })(Nav)

export default PropConnectedComponent
