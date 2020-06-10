import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Block from './Toolbar.Block'
import Item from './Toolbar.Item'
import Shadow from './Toolbar.Shadow'
import { classNames } from '../../utilities/classNames'
import { WrapperUI, ToolbarUI } from './Toolbar.css'

export class Toolbar extends React.PureComponent {
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
      <WrapperUI className="c-ToolbarWrapper">
        <ToolbarUI {...getValidProps(rest)} className={this.getClassName()}>
          {children}
        </ToolbarUI>
        {this.renderShadow()}
      </WrapperUI>
    )
  }
}

Toolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  placement: PropTypes.oneOf(['top', 'bottom']),
  shadow: PropTypes.bool,
  seamless: PropTypes.bool,
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  theme: PropTypes.oneOf(['default', 'note']),
}

Toolbar.defaultProps = {
  'data-cy': 'Toolbar',
  placement: 'top',
  seamless: false,
  shadow: false,
  size: 'sm',
  theme: 'default',
}

export default Toolbar
