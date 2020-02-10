import React from 'react'
import { classNames } from '../../utilities/classNames'

import Container from './Grid.Container'
import Row from './Grid.Row'
import Col from './Grid.Col'

class Grid extends React.PureComponent {
  static Container = Container
  static Row = Row
  static Col = Col

  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-Grid', className)

    return (
      <Container className={componentClassName} {...rest}>
        <Row>{children}</Row>
      </Container>
    )
  }
}

export default Grid
