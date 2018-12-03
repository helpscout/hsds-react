import * as React from 'react'
import { connect } from '@helpscout/wedux'
import propConnect from '../../PropProvider/propConnect'
import { MenuWrapperUI, MenuUI } from './Dropdown.css.js'
import ScrollLock from '../../ScrollLock'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'
import { namespaceComponent } from '../../../utilities/component'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  className?: string
  children?: any
  id?: string
  innerRef: (node: HTMLElement) => void
  innerWrapperRef: (node: HTMLElement) => void
  isSubMenu: boolean
  style: Object
  withScrollLock: boolean
  zIndex: number
}

export class Menu extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    innerWrapperRef: noop,
    isSubMenu: false,
    style: {},
    withScrollLock: true,
    zIndex: 1015,
  }

  getStyles = (): Object => {
    const { style, zIndex } = this.props

    return { ...style, zIndex }
  }

  renderMenu = () => {
    const {
      children,
      className,
      innerRef,
      innerWrapperRef,
      isSubMenu,
      ...rest
    } = this.props
    const componentClassName = classNames(
      'c-DropdownV2Menu',
      isSubMenu && 'is-subMenu',
      className
    )

    return (
      <MenuWrapperUI
        className="c-DropdownV2MenuWrapper"
        innerRef={innerWrapperRef}
      >
        <MenuUI
          {...rest}
          className={componentClassName}
          innerRef={innerRef}
          style={this.getStyles()}
        >
          {children}
        </MenuUI>
      </MenuWrapperUI>
    )
  }

  render() {
    const { withScrollLock } = this.props

    return withScrollLock ? (
      <ScrollLock stopPropagation>{this.renderMenu()}</ScrollLock>
    ) : (
      this.renderMenu()
    )
  }
}

namespaceComponent(COMPONENT_KEY.Menu)(Menu)
const PropConnectedComponent = propConnect(COMPONENT_KEY.Menu)(Menu)

const ConnectedMenu: any = connect(
  // mapStateToProps
  (state: any) => {
    const { withScrollLock } = state

    return {
      withScrollLock,
    }
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedMenu
