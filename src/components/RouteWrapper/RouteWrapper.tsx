import * as React from 'react'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import { noop } from '../../utilities/other'
import get from '../../utilities/get'

const RouteWrapper = WrappedComponent => {
  const componentName =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    /* istanbul ignore next */
    'Component'

  class Component extends React.PureComponent<any> {
    static contextTypes = {
      router: noop,
    }

    static defaultProps = {
      onClick: noop,
      fetch: () => Promise.resolve(),
    }

    static displayName = `withRoute(${componentName})`

    handleOnClick = event => {
      const { fetch, to } = this.props
      const history = get(this, 'context.router.history')

      this.props.onClick(event)

      if (!to || !history) return

      if (event && (event.metaKey || event.ctrlKey)) {
        // Allow ctrl + clicks to function normally
        return
      }

      event && event.preventDefault()

      fetch()
        .then(() => history.push(to))
        .catch(console.log)
    }

    render() {
      const { fetch, href, to, 'data-bypass': dataByPass, ...rest } = this.props

      // TODO: Resolve data-bypass
      // const dataByPassValue = isDefined(dataByPass) ? dataByPass : !!to

      return (
        <WrappedComponent
          {...rest}
          href={href || to}
          onClick={this.handleOnClick}
        />
      )
    }
  }

  return hoistNonReactStatics(Component, WrappedComponent)
}

export default RouteWrapper
