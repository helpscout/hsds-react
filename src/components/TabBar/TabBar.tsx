import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Nav from '../Nav'
import Toolbar from '../Toolbar'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { TabBarUI, SecContentUI, ToolbarUI } from './TabBar.css'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  secContent?: any
  align?: 'left' | 'center' | 'right'
}

export class TabBar extends React.Component<Props> {
  static className = 'c-TabBar'
  static defaultProps = {
    innerRef: noop,
    align: 'left',
  }

  static Item = Nav.Item

  getClassName() {
    const { className } = this.props
    return classNames(TabBar.className, className)
  }

  render() {
    const { children, innerRef, secContent, align, ...rest } = this.props

    return (
      <TabBarUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef as any}
        align={align}
      >
        <ToolbarUI placement="top">
          <Toolbar.Item>
            <Nav>{children}</Nav>
          </Toolbar.Item>
          {secContent && (
            <SecContentUI align={align}>{secContent}</SecContentUI>
          )}
        </ToolbarUI>
      </TabBarUI>
    )
  }
}

export default TabBar
