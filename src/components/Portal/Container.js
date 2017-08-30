import React from 'react'
import classNames from '../../utilities/classNames'

export const ID = 'HSBluePortalContainer'

const Container = props => {
  const className = classNames(
    'c-PortalContainer',
    props.className
  )

  return (
    <div id={ID} className={className} />
  )
}

export default Container
