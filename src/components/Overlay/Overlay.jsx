import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { OverlayUI } from './Overlay.css'

type Props = {
  children?: any
  className?: string
  isHsApp: boolean
  fixed: boolean
  transparent: boolean
}

class Overlay extends React.PureComponent<Props> {
  static defaultProps = {
    fixed: false,
    isHsApp: false,
    transparent: false,
  }

  render() {
    const {
      children,
      className,
      fixed,
      transparent,
      isHsApp,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Overlay',
      fixed && 'is-fixed',
      transparent && 'is-transparent',
      className
    )

    return (
      <OverlayUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="dialog"
        isHsApp={isHsApp}
        data-cy="Overlay"
      >
        {children}
      </OverlayUI>
    )
  }
}

export default Overlay
