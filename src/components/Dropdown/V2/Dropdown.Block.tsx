import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../../PropProvider/propConnect'
import { BlockUI } from './Dropdown.css'
import { classNames } from '../../../utilities/classNames'
import { namespaceComponent } from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  isSeamless: boolean
  isStretchy: boolean
}

export class Block extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
    isSeamless: false,
    isStretchy: false,
  }

  render() {
    const {
      children,
      className,
      innerRef,
      isSeamless,
      isStretchy,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-DropdownV2Block',
      isSeamless && 'is-seamless',
      isStretchy && 'is-stretchy',
      className
    )

    return (
      <BlockUI
        {...getValidProps(rest)}
        className={componentClassName}
        innerRef={innerRef}
      >
        {children}
      </BlockUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Block)(Block)
const PropConnectedComponent = propConnect(COMPONENT_KEY.Block)(Block)

export default PropConnectedComponent
