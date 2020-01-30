import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { PopperUI } from './Tooltip.css'

export interface Props {
  children: any
  className?: string
  innerRef: (node: HTMLElement) => void
  theme?: string
}

export class Popper extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
  }

  static className = 'c-TooltipPopper'

  getClassName() {
    const { className } = this.props

    return classNames(Popper.className, className)
  }

  render() {
    const { children, className, innerRef, theme, ...rest } = this.props

    return (
      <PopperUI
        {...getValidProps(rest)}
        ref={innerRef}
        className={this.getClassName()}
      >
        {children}
      </PopperUI>
    )
  }
}

export default Popper
