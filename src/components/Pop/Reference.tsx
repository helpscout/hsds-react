import * as React from 'react'
import ReactPopperReference from '../Popper/Popper.Reference'
import styled from '../styled'

class Reference extends React.Component<any> {
  static displayName = 'Pop.Reference'

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

export default Reference
