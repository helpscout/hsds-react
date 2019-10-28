import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Nav from '../Nav'
import Toolbar from '../Toolbar'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { TabBarUI, SecContentUI, ToolbarUI } from './styles/TabBar.css'
import { COMPONENT_KEY } from './TabBar.utils'

export interface Props {
  className?: string
  children?: any
  ref: (node: HTMLElement) => void
  secContent?: any
  align?: 'left' | 'center' | 'right'
}

export class TabBar extends React.Component<Props> {
  static className = 'c-TabBar'
  static defaultProps = {
    ref: noop,
    align: 'left',
  }

  static Item = Nav.Item

  getClassName() {
    const { className } = this.props
    return classNames(TabBar.className, className)
  }

  render() {
    const { children, ref, secContent, align, ...rest } = this.props

    return (
      <TabBarUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={ref as any}
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

const PropConnectedComponent = propConnect(COMPONENT_KEY, { pure: false })(
  TabBar
)

export default PropConnectedComponent
