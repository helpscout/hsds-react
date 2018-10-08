// @flow
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { HrUI } from './styles/Hr.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
  role: string,
  size: 'md' | 'sm' | 'xs' | 'none',
}

const Hr = (props: Props) => {
  const { className, children, role, size, ...rest } = props
  const componentClassName = classNames('c-Hr', size && `is-${size}`, className)

  return (
    <HrUI {...getValidProps(rest)} className={componentClassName} role={role} />
  )
}

Hr.defaultProps = {
  role: 'separator',
  size: 'md',
}

namespaceComponent(COMPONENT_KEY)(Hr)

export default Hr
