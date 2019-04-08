import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Nav from '../Nav'
import Toolbar from '../Toolbar'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { TabBarUI, RightContentUI, ToolbarUI } from './TabBar.css'
import { COMPONENT_KEY } from './TabBar.utils'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  rightContent?: any
}

export class TabBar extends React.Component<Props> {
  static className = 'c-TabBar'
  static defaultProps = {
    innerRef: noop,
  }

  static Item = Nav.Item

  getClassName() {
    const { className } = this.props
    return classNames(TabBar.className, className)
  }

  render() {
    const { children, innerRef, rightContent, ...rest } = this.props

    return (
      <TabBarUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <ToolbarUI placement="top">
          <Toolbar.Item>
            <Nav>{children}</Nav>
          </Toolbar.Item>
          {rightContent && (
            <Toolbar.Item>
              <RightContentUI>{rightContent}</RightContentUI>
            </Toolbar.Item>
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
