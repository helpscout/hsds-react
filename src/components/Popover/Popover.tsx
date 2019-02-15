import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { PopoverUI } from './Popover.css'
import { COMPONENT_KEY } from './Popover.utils'
import Tooltip, { Props as TooltipProps } from '../Tooltip/Tooltip'

export interface Props extends TooltipProps {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export class Popover extends React.PureComponent<Props> {
  static className = 'c-Popover'
  static defaultProps = {
    ...Tooltip.defaultProps,
    color: 'white',
    innerRef: noop,
  }

  getClassName() {
    const { className } = this.props
    return classNames(Popover.className, className)
  }

  render() {
    const { innerRef, ...rest } = this.props

    return (
      <PopoverUI
        {...rest}
        arrowClassName="c-PopoverArrow"
        arrowSize={12}
        contentClassName="c-PopoverContent"
        className={this.getClassName()}
        innerRef={innerRef}
      />
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Popover)

export default PropConnectedComponent
