import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../../utilities/classNames'
import { HeaderUI } from './Dropdown.css.js'
import Heading from '../../Heading'

export class Header extends React.PureComponent<any> {
  static defaultProps = {
    label: 'Header',
  }

  render() {
    const { children, label, ...rest } = this.props
    const textLabel = label || children

    return (
      <HeaderUI {...getValidProps(rest)} tabIndex={null}>
        <Heading size="small" light>
          {textLabel}
        </Heading>
      </HeaderUI>
    )
  }
}

export default Header
