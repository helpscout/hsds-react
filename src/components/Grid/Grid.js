import React from 'react'
import classNames from '../../utilities/classNames.ts'
import Container from './Container'
import Row from './Row'
import Col from './Col'

const Grid = props => {
  const { className, children, ...rest } = props

  const componentClassName = classNames('c-Grid', className)

  return (
    <Container className={componentClassName} {...rest}>
      <Row>{children}</Row>
    </Container>
  )
}

Grid.Container = Container
Grid.Row = Row
Grid.Col = Col

export default Grid
