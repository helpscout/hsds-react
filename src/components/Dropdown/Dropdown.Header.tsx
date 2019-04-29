import * as React from 'react'
import Heading from '../Heading'
import { classNames } from '../../utilities/classNames'

type Props = {
  children?: any
  className?: string
}

const Header = (props: Props) => {
  const { children, className, ...rest } = props

  const componentClassName = classNames('c-DropdownHeader', className)

  return (
    <div className={componentClassName} {...rest}>
      <Heading size="small" light>
        {children}
      </Heading>
    </div>
  )
}

export default Header
