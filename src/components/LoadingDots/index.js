// @flow
import React from 'react'
import { classNames } from '../../utilities/classNames'

type Props = {
  align?: 'left' | 'center' | 'right' | '',
  className?: string,
}

const LoadingDots = (props: Props) => {
  const { align, className, ...rest } = props
  const componentClassName = classNames(
    'c-LoadingDots',
    align && `is-${align}`,
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      <div className="c-LoadingDots__dot c-LoadingDots__dot--one" />
      <div className="c-LoadingDots__dot c-LoadingDots__dot--two" />
      <div className="c-LoadingDots__dot c-LoadingDots__dot--three" />
    </div>
  )
}

export default LoadingDots
