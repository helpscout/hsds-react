import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { RowUI } from './Grid.Row.css'
import { GridRowProps } from './Grid.types'

class Row extends React.PureComponent<GridRowProps> {
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
