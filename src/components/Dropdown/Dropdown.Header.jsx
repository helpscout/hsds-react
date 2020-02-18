import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { HeaderUI } from './Dropdown.css'
import Heading from '../Heading'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export class Header extends React.PureComponent {
  static displayName = 'DropdownHeader'

  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
    label: PropTypes.string,
  }

  static defaultProps = {
    innerRef: noop,
  }

  render() {
    const { className, children, innerRef, label, ...rest } = this.props
    const componentClassName = classNames('c-DropdownHeader', className)

    const textLabel = children || label

    return (
      <HeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={innerRef}
        tabIndex={null}
      >
        <Heading size="small" light>
          {textLabel}
        </Heading>
      </HeaderUI>
    )
  }
}

export default Header
