// @flow
import React, { Component } from 'react'
import ReactPopperReference from '../Popper/Reference'

type Props = any

class Reference extends Component<Props> {
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
