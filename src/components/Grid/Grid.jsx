import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import GridContainer from './Grid.Container'
import GridRow from './Grid.Row'
import GridCol from './Grid.Col'

class Grid extends React.PureComponent {
  static Container = GridContainer
  static Row = GridRow
  static Col = GridCol

  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-Grid', className)

    return (
      <GridContainer className={componentClassName} {...getValidProps(rest)}>
        <GridRow>{children}</GridRow>
      </GridContainer>
    )
  }
}

Grid.defaultProps = {
  'data-cy': 'Grid',
}

export default Grid
