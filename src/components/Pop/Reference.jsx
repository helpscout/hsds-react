import React from 'react'
import PropTypes from 'prop-types'
import ReactPopperReference from '../Popper/Popper.Reference'
import styled from 'styled-components'

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

const ReferenceUI = styled('span')<{ display?: any }>`
  display: ${props => props.display};
`

export default Reference
