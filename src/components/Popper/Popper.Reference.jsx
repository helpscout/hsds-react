import React from 'react'
import PropTypes from 'prop-types'
import { ManagerContext } from './Popper.Manager'
import { safeInvoke, unwrapArray } from './Popper.utils'

class InnerReference extends React.Component {
  refHandler = node => {
    safeInvoke(this.props.ref, node)
    safeInvoke(this.props.getReferenceRef, node)
  }

  render() {
    return unwrapArray(this.props.children)({ ref: this.refHandler })
  }
}

export default function Reference(props) {
  return (
    <ManagerContext.Consumer>
      {({ getReferenceRef }) => (
        <InnerReference getReferenceRef={getReferenceRef} {...props} />
      )}
    </ManagerContext.Consumer>
  )
}

Reference.propTypes = {
  children: PropTypes.func,
  ref: PropTypes.func,
  getReferenceRef: PropTypes.func,
}
