import * as React from 'react'
import ReactPopperReference from '../Popper/Popper.Reference'
import styled from '../styled'

type Props = any

class Reference extends React.Component<Props> {
  render() {
    return (
      // TODO: fix typescript complains
      // @ts-ignore
      <ReactPopperReference>
        // TODO: fix typescript complains // @ts-ignore
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

// TODO: fix typescript complains
// @ts-ignore
Reference.displayName = 'Pop.Reference'

export default Reference
