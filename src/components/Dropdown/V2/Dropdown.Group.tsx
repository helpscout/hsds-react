import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../../PropProvider/propConnect'
import { GroupUI } from './Dropdown.css'
import { classNames } from '../../../utilities/classNames'
import { namespaceComponent } from '../../../utilities/component'
import { noop } from '../../../utilities/other'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface Props {
  className?: string
  children?: any
  ref: (node: HTMLElement) => void
}

export class Group extends React.PureComponent<Props> {
  static defaultProps = {
    ref: noop,
  }

  render() {
    const { className, children, ref, ...rest } = this.props
    const componentClassName = classNames('c-DropdownV2Group', className)

    return (
      <GroupUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={ref}
        tabIndex={null}
        role="group"
      >
        {children}
      </GroupUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.Group)(Group)

export default PropConnectedComponent
