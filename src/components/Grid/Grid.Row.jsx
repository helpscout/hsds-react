import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { RowUI } from './Grid.Row.css'

class Row extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    flex: PropTypes.bool, // deprecating
    isFlex: PropTypes.bool,
    size: PropTypes.oneOf(['md', 'sm', 'xs']),
  }

  static displayName = 'GridRow'

  static defaultProps = {
    flex: false,
    isFlex: false,
  }

  render() {
    const { className, children, flex, isFlex, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-Row',
      (flex || isFlex) && 'is-flex',
      size && `is-${size}`,
      className
    )

    return (
      <RowUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </RowUI>
    )
  }
}

export default Row
