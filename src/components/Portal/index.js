import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { default as Container, ID as portalContainerId } from './Container'

export const propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  exact: PropTypes.bool,
  id: PropTypes.string,
  renderTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onBeforeOpen: PropTypes.func,
  onOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onClose: PropTypes.func,
  path: PropTypes.string,
  timeout: PropTypes.number
}

const types = Object.assign({}, propTypes, {
  children: PropTypes.element.isRequired
})

const defaultProps = {
  timeout: 0
}

class Portal extends React.Component {
  constructor (props) {
    super()
    this.node = null
    this.portal = null
    this.mountSelector = null
    this.isOpening = false
    this.isOpen = false
    this.isClosing = false
  }

  componentDidMount () {
    this.mountSelector = this.getMountSelector()
    this.openPortal(this.props)
  }

  /* istanbul ignore next */
  componentWillReceiveProps (nextProps) {
    if (this.node && this.props.className !== nextProps.className) {
      this.node.className = nextProps.className
    }

    this.openPortal(nextProps)
  }

  componentWillUnmount () {
    setTimeout(() => {
      this.closePortal(this.props)
    }, this.props.timeout)
  }

  getMountSelector () {
    const { renderTo } = this.props
    // 1. Prioritize renderTo selector
    let mountSelector = (typeof renderTo === 'string' && renderTo) ? document.querySelector(renderTo) : false
    mountSelector = (typeof renderTo === 'object' && renderTo.tagName) ? renderTo : mountSelector
    // 2. Fallback to <Portal.Container />
    mountSelector = mountSelector || document.querySelector(`#${portalContainerId}`)
    // 3. Fallback to document.body
    return mountSelector || document.body // fallback
  }

  mountPortal (props) {
    if (this.node) return

    const {
      children,
      className,
      id,
      onOpen
    } = props

    this.node = document.createElement('div')
    if (className) {
      this.node.className = className
    }
    if (id) {
      this.node.id = id
    }
    // Render to specified target, instead of document
    this.mountSelector.appendChild(this.node)

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node
    )

    if (onOpen) onOpen(this)

    this.isOpening = false
    this.isOpen = true
  }

  unmountPortal (props) {
    /* istanbul ignore next */
    if (!this.node) return

    const {
      onClose
    } = props

    ReactDOM.unmountComponentAtNode(this.node)
    // Unmount from specified target, instead of document
    this.mountSelector.removeChild(this.node)

    if (onClose) onClose(this)

    this.node = null
    this.portal = null
    this.isClosing = false
    this.isOpen = false
  }

  openPortal (props) {
    const {
      onBeforeOpen
    } = props

    const mountPortal = this.mountPortal.bind(this)

    if (onBeforeOpen) {
      /* istanbul ignore next */
      if (!this.isOpening && !this.isOpen) {
        this.isOpening = true
        onBeforeOpen(() => { mountPortal(props) })
      }
    } else {
      this.isOpening = true
      mountPortal(props)
    }
  }

  closePortal (props) {
    const {
      onBeforeClose
    } = props

    const unmountPortal = this.unmountPortal.bind(this)

    if (onBeforeClose) {
      /* istanbul ignore next */
      if (!this.isClosing) {
        this.isClosing = true
        onBeforeClose(() => { unmountPortal(props) })
      }
    } else {
      this.isClosing = true
      unmountPortal(props)
    }
  }

  render () {
    return null
  }
}

Portal.propTypes = types
Portal.defaultProps = defaultProps
Portal.Container = Container

export default Portal
