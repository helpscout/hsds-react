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
const RouteWrapper = WrappedComponent => {
  class Component extends React.PureComponent {
    render() {
      const { fetch = () => Promise.resolve(), to, ...rest } = this.props
      if (to) {
        if (this.context && this.context.router) {
          const history = this.context.router.history
          rest.onClick = e => {
            if (e && (e.metaKey || e.ctrlKey)) {
              // Allow ctrl+clicks to function normally
              return
            }
            e && e.preventDefault()
            fetch().then(() => {
              history.push(to)
            })
          }
        } else {
          console.error(
            'The `to` attribute can only be used in the the context of a React Router.'
          )
        }
      }
      return <WrappedComponent {...rest} />
    }
  }

  Component.contextTypes = {
    router: PropTypes.object,
  }

  Component.propTypes = {
    fetch: PropTypes.func,
    start: PropTypes.func,
    to: PropTypes.string,
  }

  const componentName =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    /* istanbul ignore next */
    'Component'
  Component.displayName = `withRoute(${componentName})`

  return Component
}

export default RouteWrapper
