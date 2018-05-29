// @flow
import React, { Component } from 'react'
import { Reference as ReactPopperReference } from 'react-popper'

class Reference extends Component {
  render() {
    const { children } = this.props

    return (
      <ReactPopperReference>
        {({ ref }) => <span ref={ref}>{children}</span>}
      </ReactPopperReference>
    )
  }
}

export default Reference
