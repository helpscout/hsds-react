import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { HrUI } from './Hr.css'

class Hr extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    role: PropTypes.string,
    size: PropTypes.oneOf(['md', 'sm', 'xs', 'none']),
  }

  static defaultProps = {
    role: 'separator',
    size: 'md',
  }

  render() {
    const { className, children, role, size, ...rest } = this.props
    const componentClassName = classNames(
      'c-Hr',
      size && `is-${size}`,
      className
    )

    return (
      <HrUI
        {...getValidProps(rest)}
        className={componentClassName}
        role={role}
      />
    )
  }
}

export default Hr
