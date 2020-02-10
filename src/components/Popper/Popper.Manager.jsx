import React from 'react'
import PropTypes from 'prop-types'

export const ManagerContext = React.createContext({
  getReferenceRef: undefined,
  referenceNode: undefined,
})

export type ManagerProps = {
  children: any
}
type ManagerState = {
  context: {
    getReferenceRef?: (HTMLElement?) => void
    referenceNode?: HTMLElement
  }
}

export default class Manager extends React.Component<
  ManagerProps,
  ManagerState
> {
  constructor(popper) {
    super(popper)

    this.state = {
      context: {
        getReferenceRef: this.getReferenceRef,
        referenceNode: undefined,
      },
    }
  }

  getReferenceRef = referenceNode => {
    this.setState(({ context }) => ({
      context: { ...context, referenceNode },
    }))
  }

  render() {
    return (
      <ManagerContext.Provider value={this.state.context}>
        {this.props.children}
      </ManagerContext.Provider>
    )
  }
}
