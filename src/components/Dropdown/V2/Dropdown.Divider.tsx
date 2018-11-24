import * as React from 'react'
import { classNames } from '../../../utilities/classNames'
import { DividerUI } from './Dropdown.css.js'

export class Divider extends React.PureComponent {
  render() {
    return <DividerUI tabIndex={null} role="presentation" />
  }
}

export default Divider
