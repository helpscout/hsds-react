import * as React from 'react'
import ReactPopperReference from '../Popper/Popper.Reference'
import { styledComponent } from '../styled'

class Reference extends React.Component<any> {
  static displayName = 'Pop.Reference'

  render() {
    return (
      <ReactPopperReference>
        {({ ref }) => (
          <ReferenceUI className="c-PopReference" ref={ref} {...this.props} />
        )}
      </ReactPopperReference>
    )
  }
}

const ReferenceUI = styledComponent('span')`
  display: ${props => props.display};
`

export default Reference
