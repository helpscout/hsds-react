import * as React from 'react'
import { connect } from 'unistore/react'
import propConnect from '../../PropProvider/propConnect'
import { MenuUI } from './Dropdown.css.js'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'
import { namespaceComponent } from '../../../utilities/component'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  className?: string
  children?: any
  id?: string
  innerRef: (node: HTMLElement) => void
  isSubMenu: boolean
  maxHeight: number
  maxWidth: number
  minHeight: number
  minWidth: number
  style: Object
  zIndex: number
}

export class Menu extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    minWidth: 180,
    maxWidth: 360,
    minHeight: 48,
    maxHeight: 320,
    isSubMenu: false,
    style: {},
    zIndex: 1015,
  }

  getStyles = (): Object => {
    const {
      minWidth,
      minHeight,
      maxHeight,
      maxWidth,
      style,
      zIndex,
    } = this.props

    return { ...style, minWidth, minHeight, maxHeight, maxWidth, zIndex }
  }

  render() {
    const { children, className, innerRef, isSubMenu, ...rest } = this.props
    const componentClassName = classNames(
      className,
      isSubMenu && 'is-subMenu',
      'c-DropdownV2Menu'
    )

    return (
      <MenuUI
        {...rest}
        className={componentClassName}
        innerRef={innerRef}
        style={this.getStyles()}
      >
        {children}
      </MenuUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Menu)(Menu)
const PropConnectedComponent = propConnect(COMPONENT_KEY.Menu)(Menu)

const ConnectedMenu: any = connect(
  // mapStateToProps
  (state: any) => {
    const { maxHeight, maxWidth, minHeight, minWidth } = state

    return {
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
    }
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedMenu
