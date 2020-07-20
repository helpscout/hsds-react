import React from 'react'
import { classNames } from '../../utilities/classNames'

export const ID = 'HSDSPortalContainer'

const Container = props => {
  const { className, ...rest } = props

  const componentClassName = classNames('c-PortalContainer', className)

  return <div id={ID} className={componentClassName} {...rest} />
}

export default Container
