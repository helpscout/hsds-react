// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { OverlayUI } from './styles/Overlay.css.js'

type Props = {
  children?: any,
  className?: string,
  fixed: boolean,
  transparent: boolean,
}

class Overlay extends Component<Props> {
  static defaultProps = {
    fixed: false,
    transparent: false,
  }

  render() {
    const { children, className, fixed, transparent, ...rest } = this.props

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
      >
        {children}
      </OverlayUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(Overlay)

export default Overlay
