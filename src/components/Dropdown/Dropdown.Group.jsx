import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { GroupUI } from './Dropdown.css'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
}

export class Group extends React.PureComponent<Props> {
  static displayName = 'DropdownGroup'

  static defaultProps = {
    innerRef: noop,
  }

  render() {
    const { className, children, innerRef, ...rest } = this.props
    const componentClassName = classNames('c-DropdownV2Group', className)

    return (
      <GroupUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={innerRef}
        tabIndex={null}
        role="group"
      >
        {children}
      </GroupUI>
    )
  }
}

export default Group
