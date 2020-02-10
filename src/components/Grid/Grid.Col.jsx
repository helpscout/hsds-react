import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames, variantClassNames } from '../../utilities/classNames'
import { ColUI } from './Grid.Col.css'

class Col extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['md', 'sm', 'xs']),
  }

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

export default Col
