import React from 'react'
import PropTypes from 'prop-types'
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
      <GridContainer className={componentClassName} {...rest}>
        <GridRow>{children}</GridRow>
      </GridContainer>
    )
  }
}

Grid.defaultProps = {
  'data-cy': 'Grid',
}

Grid.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Grid
