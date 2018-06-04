import React, { Component } from 'react'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import css from './styles/TooltipPopper.css'

class PopperComponent extends Component {
  render() {
    const { children, className, styles, theme, ...rest } = this.props

    const componentClassName = classNames(
      styles.TooltipPopper,
      'c-TooltipPopper',
      className
    )

    return (
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    )
  }
}

const Popper = styled(PopperComponent)(css)
Popper.displayName = 'Tooltip.Popper'

export default Popper
