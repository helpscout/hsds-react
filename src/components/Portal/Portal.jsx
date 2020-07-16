import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getDocumentFromComponent from '@helpscout/react-utils/dist/getDocumentFromComponent'
import Container, { ID as portalContainerId } from './Portal.Container'
import { isNodeElement } from '../../utilities/node'
import { isObject, isString } from '../../utilities/is'
import { StyleSheetContext } from 'styled-components'
import { GlobalContext } from '../HSDS/Provider'

export class Portal extends React.Component {
  static defaultProps = {
    timeout: 0,
  }
  static Container = Container

  document = null
  node = null
  portal = null
  isOpening = false
  isOpen = false
  isClosing = false

  state = {
    mountSelector: null,
  }

  componentDidMount() {
    this.document = getDocumentFromComponent(this) || window.document
    this.setState(
      {
        mountSelector: this.getMountSelector(),
      },
      () => {
        this.openPortal(this.props)
      }
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.node && this.props.className !== nextProps.className) {
      this.node.className = nextProps.className
    }

    this.openPortal(nextProps)
  }

  componentWillUnmount() {
    setTimeout(() => {
      this.closePortal(this.props)
    }, this.props.timeout)
  }

  shouldComponentUpdate(nextProps) {
    return false
  }

  getMountSelector() {
    let { renderTo } = this.props
    let mountSelector
    // 1. Prioritize renderTo selector
    if (renderTo) {
      mountSelector = isString(renderTo)
        ? document.querySelector(renderTo)
        : false

      if (renderTo.hasOwnProperty('current')) {
        // it is a context, use that value has the renderTo element
        renderTo = renderTo.current
      }

      mountSelector =
        isObject(renderTo) && isNodeElement(renderTo) ? renderTo : mountSelector
    }
    // 2. Fallback to <Portal.Container />
    mountSelector =
      mountSelector || document.querySelector(`#${portalContainerId}`)

    // 3- is inside an iframe, but not the one created by storybook/cypress
    if (
      !mountSelector &&
      window.parent &&
      !window.STORYBOOK_ENV &&
      !window.Cypress
    ) {
      mountSelector = window.parent.document.body
    }

    // 4. Fallback to document.body
    return mountSelector || this.document.body // fallback
  }

  renderPortalContent = props => {
    const { children, stylesheet, scope } = props
    if (!children || !React.isValidElement(children)) return

    let child = <>{children}</>
    if (stylesheet) {
      child = (
        <StyleSheetContext.Provider value={stylesheet}>
          <>{children}</>
        </StyleSheetContext.Provider>
      )
    }
    if (scope) {
      child = <div className={scope}>{child}</div>
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      child,
      this.node
    )
  }

  mountPortal = (props, state) => {
    const { className, id, onOpen } = props

    if (!this.state.mountSelector) return

    if (this.node) {
      this.renderPortalContent(props)
      return
    }

    this.node = document.createElement('div')

    if (className) {
      this.node.className = className
    }
    if (id) {
      this.node.id = id
    }

    // Render to specified target, instead of document

    this.state.mountSelector.appendChild(this.node)
    this.renderPortalContent(props)

    if (onOpen) onOpen(this)

    this.isOpening = false
    this.isOpen = true
  }

  unmountPortal = props => {
    if (!this.node) return

    const { onClose } = props

    ReactDOM.unmountComponentAtNode(this.node)
    // Unmount from specified target, instead of document
    if (
      this.state.mountSelector &&
      this.node.parentNode === this.state.mountSelector
    ) {
      this.state.mountSelector.removeChild(this.node)
    }

    if (onClose) onClose(this)

    this.node = null
    this.portal = null
    this.isClosing = false
    this.isOpen = false
  }

  openPortal(props) {
    const { onBeforeOpen } = props

    if (onBeforeOpen) {
      if (!this.isOpening && !this.isOpen) {
        this.isOpening = true
        onBeforeOpen(() => {
          this.mountPortal(props)
        })
      }
    } else {
      this.isOpening = true

      this.mountPortal(props)
    }
  }

  closePortal(props) {
    const { onBeforeClose } = props

    if (onBeforeClose) {
      if (!this.isClosing) {
        this.isClosing = true
        onBeforeClose(() => {
          this.unmountPortal(props)
        })
      }
    } else {
      this.isClosing = true
      this.unmountPortal(props)
    }
  }

  render() {
    return null
  }
}

const PortalWithContext = props => {
  const scContext = useContext(StyleSheetContext) || null
  const { getCurrentScope } = useContext(GlobalContext) || {}
  const scope = getCurrentScope ? getCurrentScope() : null

  return <Portal {...props} stylesheet={scContext} scope={scope} />
}

PortalWithContext.propTypes = {
  className: PropTypes.string,
  exact: PropTypes.bool,
  id: PropTypes.string,
  renderTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onBeforeOpen: PropTypes.func,
  onOpen: PropTypes.func,
  onBeforeClose: PropTypes.func,
  onClose: PropTypes.func,
  path: PropTypes.string,
  timeout: PropTypes.number,
}

export default PortalWithContext
