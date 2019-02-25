import * as React from 'react'
import { classNames } from '../../utilities/classNames'

const ForceRouterRenderer = props => {
  const { children, className, location, selector } = props
  return React.createElement(
    selector,
    {
      className: classNames(ForceRouterRenderer.className, className),
    },
    children
  )
}

ForceRouterRenderer.className = 'c-RouterRenderer'
ForceRouterRenderer.defaultProps = {
  selector: 'div',
}

export default ForceRouterRenderer
