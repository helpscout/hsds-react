import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { GroupUI } from './Dropdown.css'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export class Group extends React.PureComponent {
  static displayName = 'DropdownGroup'

  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
  }

  static defaultProps = {
    innerRef: noop,
  }

  render() {
    const { className, children, innerRef, ...rest } = this.props
    const componentClassName = classNames('c-DropdownGroup', className)

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
