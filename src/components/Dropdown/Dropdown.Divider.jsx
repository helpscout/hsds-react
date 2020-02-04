import React from 'react'
import { PropTypes } from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../../utilities/classNames'
import { DividerUI } from './Dropdown.css'
import { noop } from '../../../utilities/other'

export class Divider extends React.PureComponent {
  static displayName = 'DropdownDivider'

  static propTypes = {
    innerRef: PropTypes.func,
  }

  static defaultProps = {
    innerRef: noop,
  }

  render() {
    const { className, children, innerRef, ...rest } = this.props
    const componentClassName = classNames('c-DropdownDivider', className)

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

export default Divider
