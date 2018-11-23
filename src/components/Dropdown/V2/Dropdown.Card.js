import * as React from 'react'
import { connect } from 'unistore/react'
import { CardUI } from './Dropdown.css'

class Card extends React.PureComponent {
  getStyles = (): Object => {
    const { minWidth, minHeight, maxHeight, maxWidth, style } = this.props

    return { ...style, minWidth, minHeight, maxHeight, maxWidth }
  }

  render() {
    const { children } = this.props
    return <CardUI style={this.getStyles()}>{children}</CardUI>
  }
}

const ConnectedCard: any = connect(
  // mapStateToProps
  (state: any) => {
    const { maxHeight, maxWidth, minHeight, minWidth } = state

    return {
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
    }
  }
)(
  // @ts-ignore
  Card
)

export default ConnectedCard
