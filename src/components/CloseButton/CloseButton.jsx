import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { CloseButtonUI, IconUI } from './CloseButton.css'

const noop = () => undefined

export class CloseButton extends React.PureComponent {
  renderIcon() {
    const { size } = this.props
    const isTiny = size === 'tiny'
    const iconName = !isTiny ? 'cross-large' : 'cross-small'

    return (
      <IconUI
        center
        className="c-CloseButton__icon"
        ignoreClick
        name={iconName}
        title="Close"
      />
    )
  }

  render() {
    const {
      children,
      className,
      innerRef,
      seamless,
      size,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-CloseButton',
      seamless && 'is-seamless',
      size && `is-${size}`,
      className
    )

    return (
      <CloseButtonUI
        aria-label="Close"
        {...getValidProps(rest)}
        className={componentClassName}
        ref={innerRef}
      >
        {this.renderIcon()}
      </CloseButtonUI>
    )
  }
}

CloseButton.defaultProps = {
  'data-cy': 'CloseButton',
  innerRef: noop,
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  seamless: false,
  title: 'Close',
}

CloseButton.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  children: PropTypes.any,
  innerRef: PropTypes.func,
  /** Callback when button is blurred. */
  onBlur: PropTypes.func,
  /** Callback when button is clicked. */
  onClick: PropTypes.func,
  /** Callback when button is focused. */
  onFocus: PropTypes.func,
  /** Applies a seamless style to the component. */
  seamless: PropTypes.bool,
  size: PropTypes.string,
  /** Custom title for the button. */
  title: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default CloseButton
