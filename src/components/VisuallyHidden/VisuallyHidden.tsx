import * as React from 'react'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import css from './styles/VisuallyHidden.css'

type Props = {
  children?: any
  className?: string
  focusable: boolean
}

const VisuallyHidden = (props: Props) => {
  const { children, className, focusable, ...rest } = props

  const componentClassName = classNames(
    'c-VisuallyHidden',
    focusable && 'is-focusable',
    className
  )

  const tabIndex = focusable ? 1 : undefined

  return (
    <span className={componentClassName} tabIndex={tabIndex} {...rest}>
      {children}
    </span>
  )
}

VisuallyHidden.defaultProps = {
  focusable: false,
}

export default styled(VisuallyHidden)(css)
