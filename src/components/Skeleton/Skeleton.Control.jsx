import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { ControlUI } from './Skeleton.Control.css'

class Control extends React.PureComponent<any> {
  static displayName = 'Skeleton.Control'

  static defaultProps = {
    size: 'md',
  }

  render() {
    const { className, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-SkeletonControl',
      size && `is-${size}`,
      className
    )

    return <ControlUI {...rest} className={componentClassName} />
  }
}

export default Control
