import React, { Component } from 'react'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import css from './styles/TooltipPopper.css.js'

class PopperComponent extends Component {
  render() {
    const { children, className, theme, ...rest } = this.props

    const componentClassName = classNames('c-TooltipPopper', className)

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
