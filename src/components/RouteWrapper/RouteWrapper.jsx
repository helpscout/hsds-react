import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import isString from 'lodash.isstring'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import { isModifierKeyPressed } from '@hsds/utils-keyboard'
import WithRouterCheck from '../WithRouterCheck'

function noop() {}

const RouteWrapper = WrappedComponent => {
  const namespace = getComponentName(WrappedComponent)

  class RouteWrapperComponent extends React.Component {
    static defaultProps = {
      onClick: noop,
      fetch: () => Promise.resolve(),
      replace: false,
    }

    static displayName = `withRoute(${namespace})`

    handleOnClick = event => {
      const { fetch, replace, to, history } = this.props

      this.props.onClick(event)

      if (!to || !history) return

      // Allow ctrl + clicks + non-left-clicks to function normally

      if (isModifierKeyPressed(event) || event.button) {
        return
      }

      event && event.preventDefault()

      const method = replace ? history.replace : history.push

      fetch()
        .then(() => method(to))
        .catch(console.log)
    }

    getHref = () => {
      const { href, to, location: historyLocation } = this.props
      const createHref = get(this.props, 'history.createHref')

      if (isString(to) && createHref) {
        const location =
          historyLocation && createLocation(to, null, null, historyLocation)

        return location ? createHref(location) : ''
      }

      return to || href
    }

    render() {
      const { fetch, replace, to, ...rest } = this.props

      return (
        <WrappedComponent
          {...rest}
          href={this.getHref()}
          onClick={this.handleOnClick}
        />
      )
    }
  }

  RouteWrapperComponent.propTypes = {
    fetch: PropTypes.func,
    href: PropTypes.string,
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    target: PropTypes.string,
    o: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }

  return hoistNonReactStatics(
    WithRouterCheck(RouteWrapperComponent),
    WrappedComponent
  )
}

RouteWrapper.propTypes = {
  fetch: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  replace: PropTypes.bool,
  target: PropTypes.string,
  o: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

function sanitizePathName(pathname) {
  return pathname.replace(/\:(.*)\//g, '')
}

function generateKey() {
  return Math.random().toString(36).substr(2, 5)
}

export function createLocation(path, state, key, location = {}) {
  const a = document.createElement('a')
  a.href = path || location.pathname
  const pathname = sanitizePathName(a.pathname)
  const locationKey = key || generateKey()

  return {
    state: state || null,
    pathname: '/' + pathname.split('/').filter(Boolean).join('/'),
    search: a.search,
    hash: a.hash,
    key: locationKey,
  }
}

export default RouteWrapper
