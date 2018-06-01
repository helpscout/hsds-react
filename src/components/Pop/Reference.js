// @flow
import React, { Component } from 'react'
import ReactPopperReference from '../Popper/Reference'

class Reference extends Component {
  render() {
    const { children } = this.props

    return (
      <ReactPopperReference>
        {({ ref }) => (
          <span className="c-PopReference" ref={ref}>
            {children}
          </span>
        )}
      </ReactPopperReference>
    )
  }
}

export default Reference
