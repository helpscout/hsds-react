import React, { Component } from 'react'
import { unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer } from 'react-dom'

const Portal = (options = {}) => ComposedComponent => {
  return class PortalHOC extends Component {
    componentDidMount () {
      this.mountPortal()
    }

    componentWillUnmount () {
      this.unmountPortal()
    }

    mountPortal () {
      if (!this.node) {
        this.node = document.createElement('div')
        this.node.id = 'portal'
        document.body.appendChild(this.node)
      }

      this.portal = renderSubtreeIntoContainer(
        this,
        <ComposedComponent
          {...this.props}
        />
        ,
        this.node
      )
    }

    unmountPortal () {
      document.body.removeChild(this.node)
      this.node = null
    }

    render () {
      return null
    }
  }
}

export default Portal
