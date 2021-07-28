import React from 'react'
import PropTypes from 'prop-types'
import Block from './Toolbar.Block'
import Item from './Toolbar.Item'
import Shadow from './Toolbar.Shadow'
import classNames from 'classnames'
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
        <ToolbarUI {...rest} className={this.getClassName()}>
          {children}
        </ToolbarUI>
        {this.renderShadow()}
      </WrapperUI>
    )
  }
}

Toolbar.defaultProps = {
  'data-cy': 'Toolbar',
  placement: 'top',
  seamless: false,
  shadow: false,
  size: 'sm',
  theme: 'default',
}

Toolbar.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines the border placement on the component. */
  placement: PropTypes.oneOf(['top', 'bottom']),
  /** Renders a drop-shadow. */
  shadow: PropTypes.bool,
  /** Removes the border from the component. */
  seamless: PropTypes.bool,
  /** Determines the thematic colors of the component. */
  theme: PropTypes.oneOf(['default', 'note']),
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Toolbar
