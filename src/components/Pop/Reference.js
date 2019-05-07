// @flow
import React, { Component } from 'react'
import ReactPopperReference from '../Popper/Popper.Reference'
import styled from '../styled'

type Props = any

class Reference extends Component<Props> {
  render() {
    return (
      <ReactPopperReference>
        {({ ref }) => (
          <ReferenceUI
            className="c-PopReference"
            innerRef={ref}
            {...this.props}
          />
        )}
      </ReactPopperReference>
    )
  }
}

const ReferenceUI = styled('span')`
  display: ${props => props.display};
`

Reference.displayName = 'Pop.Reference'

export default Reference
