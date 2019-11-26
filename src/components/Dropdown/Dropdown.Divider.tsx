import * as React from 'react'
import { classNames } from '../../utilities/classNames'

import { DropdownDividerUI } from './Dropdown.css'

type Props = {
  children?: any
  className?: string
}

const Divider = (props: Props) => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-DropdownDivider', className)

  return (
    <DropdownDividerUI
      className={componentClassName}
      role="separator"
      {...rest}
    />
  )
}

export default Divider
