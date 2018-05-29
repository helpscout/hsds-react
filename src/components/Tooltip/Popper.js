import React, { Component } from 'react'
import fancy from '@helpscout/fancy'
import classNames from '../../utilities/classNames'
import css from './styles/TooltipPopper.css'

class PopperComponent extends Component {
  render() {
    const { children, className, styles } = this.props

    const componentClassName = classNames(
      styles['c-TooltipPopper'],
      'c-TooltipPopper',
      className
    )

    return <div className={componentClassName}>{children}</div>
  }
}

const Popper = fancy(css)(PopperComponent)
Popper.displayName = 'Tooltip.Popper'

export default Popper
