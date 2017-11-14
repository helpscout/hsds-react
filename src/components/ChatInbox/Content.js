import React from 'react'
// import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const Content = props => {
  const {
    className,
    children,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatInboxContent',
    className
  )

  return (
    <div className={componentClassName} {...rest}>
      {children}
    </div>
  )
}

Content.displayName = 'ChatInboxContent'

export default Content
