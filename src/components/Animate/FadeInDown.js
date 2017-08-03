import React from 'react'
import Animate from './index'

const FadeInDown = props => {
  const {
    children,
    ...rest
  } = props

  return (
    <Animate className='FadeIn Down' {...rest}>
      {children}
    </Animate>
  )
}

export default FadeInDown
