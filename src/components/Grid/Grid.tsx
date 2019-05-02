import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Grid.utils'
import Container from './Grid.Container'
import Row from './Grid.Row'
import Col from './Grid.Col'

class Grid extends React.PureComponent<any> {
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

namespaceComponent(COMPONENT_KEY.Grid)(Grid)

export default Grid
