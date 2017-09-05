import React from 'react'
import classNames from '../../utilities/classNames'
import { default as GridComponent } from '../Grid'

const Grid = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-FormGroup',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      <GridComponent>
        {children}
      </GridComponent>
    </div>
  )
}

export default Grid
