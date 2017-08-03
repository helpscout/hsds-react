import React from 'react'
import Animate from './index'

const FadeIn = props => {
  const {
    children,
    ...rest
  } = props

  return (
    <Animate className='FadeIn' {...rest}>
      {children}
    </Animate>
  )
}

export default FadeIn
