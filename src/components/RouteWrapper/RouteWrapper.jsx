import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import { isModifierKeyPressed } from '../../utilities/keys'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import get from '../../utilities/get'
import { createLocation } from '../../utilities/history'
import WithRouterCheck from '../WithRouterCheck'

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
      // TODO: Resolve data-bypass
      // const dataByPassValue = isDefined(dataByPass) ? dataByPass : !!to

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

export default RouteWrapper
