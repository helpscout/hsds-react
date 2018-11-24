import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../../utilities/classNames'
import { GroupUI } from './Dropdown.css.js'

export class Group extends React.PureComponent<any> {
  render() {
    const { children, ...rest } = this.props
    return (
      <GroupUI tabIndex={null} role="group" {...getValidProps(rest)}>
        {children}
      </GroupUI>
    )
  }
}

export default Group
