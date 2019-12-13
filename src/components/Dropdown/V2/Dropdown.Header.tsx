import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { HeaderUI } from './Dropdown.css'
import Heading from '../../Heading'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  className?: string
  children?: any
  innerRef: (node: HTMLElement) => void
  label?: string
}

export class Header extends React.PureComponent<Props> {
  static defaultProps = {
    innerRef: noop,
  }

  render() {
    const { className, children, innerRef, label, ...rest } = this.props
    const componentClassName = classNames('c-DropdownV2Header', className)

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
