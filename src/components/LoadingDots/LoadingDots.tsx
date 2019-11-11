import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { LoadingDotsUI, LoadingDotUI } from './styles/LoadingDots.css'

type Props = {
  align?: 'left' | 'center' | 'right' | ''
  className?: string
}

const LoadingDots = (props: Props) => {
  const { align, className, ...rest } = props
  const componentClassName = classNames(
    'c-LoadingDots',
    align && `is-${align}`,
    className
  )

  return (
    <LoadingDotsUI className={componentClassName} {...rest}>
      <LoadingDotUI className="is-one" />
      <LoadingDotUI className="is-two" />
      <LoadingDotUI className="is-three" />
    </LoadingDotsUI>
  )
}

export default LoadingDots
