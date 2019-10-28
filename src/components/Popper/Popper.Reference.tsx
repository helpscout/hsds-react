import * as React from 'react'
import { ManagerContext } from './Popper.Manager'
import { safeInvoke, unwrapArray } from './Popper.utils'

export type ReferenceChildrenProps = { ref: (HTMLElement?) => void }
export type ReferenceProps = {
  children: (ReferenceChildrenProps) => any
  ref?: (HTMLElement?) => void
}

type referenceProps = {
  getReferenceRef?: (HTMLElement?) => void
}

class reference extends React.Component<ReferenceProps & referenceProps> {
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
        <reference getReferenceRef={getReferenceRef} {...props} />
      )}
    </ManagerContext.Consumer>
  )
}
