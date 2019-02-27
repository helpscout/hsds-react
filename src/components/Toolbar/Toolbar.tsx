import * as React from 'react'
import Flexy from '../Flexy'
import Block from './Toolbar.Block'
import Item from './Toolbar.Item'
import Shadow from './Toolbar.Shadow'
import propConnect from '../PropProvider/propConnect'
import { ToolbarPlacement, ToolbarSize, ToolbarTheme } from './Toolbar.types'
import { classNames } from '../../utilities/classNames'
import { COMPONENT_KEY } from './Toolbar.utils'

export interface Props {
  className?: string
  children?: any
  placement: ToolbarPlacement
  shadow: boolean
  seamless: boolean
  size: ToolbarSize
  theme: ToolbarTheme
}

export class Toolbar extends React.PureComponent<Props> {
  static defaultProps = {
    placement: 'top',
    seamless: false,
    shadow: false,
    size: 'sm',
    theme: 'default',
  }

  static Block = Block
  static Item = Item
  static Shadow = Shadow

  static className = 'c-Toolbar'

  getClassName() {
    const { className, placement, shadow, seamless, size, theme } = this.props

    return classNames(
      'c-Toolbar',
      placement && `is-placement-${placement}`,
      seamless && 'is-seamless',
      shadow && 'has-shadow',
      size && `is-size-${size}`,
      theme && `is-theme-${theme}`,
      className
    )
  }

  renderShadow() {
    const { placement, shadow } = this.props

    return shadow ? <Shadow placement={placement} /> : null
  }

  render() {
    const {
      children,
      className,
      placement,
      shadow,
      seamless,
      size,
      theme,
      ...rest
    } = this.props

    return (
      <div className="c-ToolbarWrapper">
        <Flexy {...rest} className={this.getClassName()}>
          {children}
        </Flexy>
        {this.renderShadow()}
      </div>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Toolbar)

export default PropConnectedComponent
