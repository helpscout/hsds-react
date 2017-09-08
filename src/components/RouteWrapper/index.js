import React from 'react'
import PropTypes from 'prop-types'

/**
 * Adds `fetch` and `to` attributes to a Component, allowing clicks to route,
 * optionally fetching data asynchronously first
 *
 * @param WrappedComponent
 * @return function
 * @constructor
 */
const RouteWrapper = (WrappedComponent) => {
  class Component extends React.Component {
    render () {
      const { fetch = () => Promise.resolve(), to, ...rest } = this.props
      if (to) {
        const history = this.context.router.history
        rest.onClick = (e) => {
          if (e && (e.metaKey || e.ctrlKey)) {
            // Allow ctrl+clicks to function normally
            return
          }
          e && e.preventDefault()
          fetch().then(() => {
            history.push(to)
          })
        }
      }
      return <WrappedComponent {...rest} />
    }
  }

  Component.contextTypes = {
    router: PropTypes.object
  }

  Component.propTypes = {
    fetch: PropTypes.func,
    start: PropTypes.func,
    to: PropTypes.string
  }
  return Component
}

export default RouteWrapper
