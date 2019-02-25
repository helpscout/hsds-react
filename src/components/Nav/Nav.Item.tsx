import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import NavLink from '../NavLink'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ItemUI } from './Nav.css'
import { ITEM_COMPONENT_KEY } from './Nav.utils'

export interface Props {
  className?: string
  children?: any
  exact: boolean
  innerRef: (node: HTMLElement) => void
}

export class Item extends React.Component<Props> {
  static className = 'c-NavItem'
  static defaultProps = {
    exact: true,
    innerRef: noop,
  }

  getClassName() {
    const { className } = this.props
    return classNames(Item.className, className)
  }

  getLinkProps() {
    const { exact, isActive, location, strict, to } = this.props

    return {
      exact,
      isActive,
      location,
      strict,
      to,
    }
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <ItemUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <NavLink {...this.getLinkProps()}>{children}</NavLink>
      </ItemUI>
    )
  }
}

const PropConnectedComponent = propConnect(ITEM_COMPONENT_KEY, { pure: false })(
  Item
)

export default PropConnectedComponent
