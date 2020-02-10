import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { CloseButtonUI, IconUI } from './CloseButton.css'

export class CloseButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    innerRef: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    seamless: PropTypes.bool,
    size: PropTypes.string,
    title: PropTypes.string,
  }
  static defaultProps = {
    innerRef: noop,
    onBlur: noop,
    onClick: noop,
    onFocus: noop,
    seamless: false,
    title: 'Close',
  }

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
        data-cy="CloseButton"
      >
        {this.renderIcon()}
      </CloseButtonUI>
    )
  }
}

export default CloseButton
