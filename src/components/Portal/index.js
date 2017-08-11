import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  timeout: PropTypes.number
}

const defaultProps = {
  timeout: 0
}

class Portal extends React.Component {
  constructor () {
    super()
    this.node = null
  }

  componentDidMount () {
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
      this.closePortal()
    }, this.props.timeout)
  }

  openPortal (props) {
    if (!this.node) {
      this.node = document.createElement('div')
      if (props.className) {
        this.node.className = props.className
      }
      if (props.id) {
        this.node.id = props.id
      }
      document.body.appendChild(this.node)
    }

    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      props.children,
      this.node
    )
  }

  closePortal () {
    /* istanbul ignore next */
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node)
      document.body.removeChild(this.node)
    }
    this.node = null
  }

  render () {
    return null
  }
}

Portal.propTypes = propTypes
Portal.defaultProps = defaultProps

export default Portal
