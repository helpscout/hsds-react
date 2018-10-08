import React, { Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled'
import { classNames } from '../../utilities/classNames.ts'
import css from './styles/TooltipPopper.css.js'

class PopperComponent extends Component {
  render() {
    const { children, className, theme, ...rest } = this.props

    const componentClassName = classNames('c-TooltipPopper', className)

    return (
      <span {...getValidProps(rest)} className={componentClassName}>
        {children}
      </span>
    )
  }
}

const Popper = styled(PopperComponent)(css)
Popper.displayName = 'Tooltip.Popper'

export default Popper
