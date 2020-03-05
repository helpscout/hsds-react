import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames, variantClassNames } from '../../utilities/classNames'
import { ColUI } from './Grid.Col.css'

class Col extends React.PureComponent {
  static displayName = 'GridCol'

  render() {
    const { className, children, size, ...rest } = this.props

    const sizeClassName = size ? variantClassNames('is', size) : null
    const componentClassName = classNames('c-Col', sizeClassName, className)

    return (
      <ColUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ColUI>
    )
  }
}

Col.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Adds sizing styles to the component. */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Col
