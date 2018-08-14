// @flow
import React from 'react'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import css from './styles/Hr.css.js'
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

  return <hr className={componentClassName} {...rest} role={role} />
}

Hr.defaultProps = {
  role: 'separator',
  size: 'md',
}

namespaceComponent(COMPONENT_KEY)(Hr)

export default styled(Hr)(css)
