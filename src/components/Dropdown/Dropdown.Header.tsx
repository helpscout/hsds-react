import * as React from 'react'
import Heading from '../Heading/index'
import { classNames } from '../../utilities/classNames'

import { DropdownHeaderUI } from './Dropdown.css'

type Props = {
  children?: any
  className?: string
}

const Header = (props: Props) => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-DropdownHeader', className)

  return (
    <DropdownHeaderUI className={componentClassName} {...rest}>
      <Heading size="small" light>
        {children}
      </Heading>
    </DropdownHeaderUI>
  )
}

export default Header
