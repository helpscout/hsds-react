// @flow
import React from 'react'
import classNames from '../../utilities/classNames'

type Props = {
  children?: any,
  className?: string,
}

const Divider = (props: Props) => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-DropdownDivider', className)

  return <div className={componentClassName} role="separator" {...rest} />
}

export default Divider
