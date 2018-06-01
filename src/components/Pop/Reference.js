// @flow
import React, { Component } from 'react'
import ReactPopperReference from '../Popper/Reference'

class Reference extends Component {
  render() {
    return (
      <ReactPopperReference>
        {({ ref }) => (
          <span className="c-PopReference" ref={ref} {...this.props} />
        )}
      </ReactPopperReference>
    )
  }
}

Reference.displayName = 'Pop.Reference'

export default Reference
