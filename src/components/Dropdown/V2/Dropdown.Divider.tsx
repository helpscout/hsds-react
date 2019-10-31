import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../../PropProvider/propConnect'
import { classNames } from '../../../utilities/classNames'
import { DividerUI } from './Dropdown.css'
import { namespaceComponent } from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  className?: string
  innerRef: (node: HTMLElement) => void
}

export class Divider extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
  }

  render() {
    const { className, children, innerRef, ...rest } = this.props
    const componentClassName = classNames('c-DropdownV2Divider', className)

    return (
      <DividerUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={innerRef}
        tabIndex={null}
        role="presentation"
      />
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Divider)(Divider)

export default PropConnectedComponent
