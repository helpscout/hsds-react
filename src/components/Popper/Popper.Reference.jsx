import React from 'react'
import PropTypes from 'prop-types'
import { ManagerContext } from './Popper.Manager'
import { safeInvoke, unwrapArray } from './Popper.utils'

export type ReferenceChildrenProps = { ref: (HTMLElement?) => void }
export type ReferenceProps = {
  children: (ReferenceChildrenProps) => any
  ref?: (HTMLElement?) => void
}

type InnerReferenceProps = {
  getReferenceRef?: (HTMLElement?) => void
}

class InnerReference extends React.Component<
  ReferenceProps & InnerReferenceProps
> {
  refHandler = node => {
    safeInvoke(this.props.ref, node)
    safeInvoke(this.props.getReferenceRef, node)
  }

  render() {
    return unwrapArray(this.props.children)({ ref: this.refHandler })
  }
}

export default function Reference(props: ReferenceProps) {
  return (
    <ManagerContext.Consumer>
      {({ getReferenceRef }) => (
        <InnerReference getReferenceRef={getReferenceRef} {...props} />
      )}
    </ManagerContext.Consumer>
  )
}
