// @flow
import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

type Props = {
  children?: any,
  className?: string,
  onClick: () => void,
  fixed: boolean,
  transparent: boolean,
}

class Overlay extends Component<Props> {
  static defaultProps = {
    onClick: noop,
    fixed: false,
    transparent: false,
  }

  render() {
    const {
      children,
      className,
      fixed,
      onClick,
      transparent,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Overlay',
      fixed && 'is-fixed',
      transparent && 'is-transparent',
      className
    )

    return (
      <div
        className={componentClassName}
        role="dialog"
        onClick={onClick}
        {...rest}
      >
        {children}
      </div>
    )
  }
}

export default Overlay
