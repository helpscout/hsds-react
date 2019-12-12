import * as React from 'react'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'
import { isModifierKeyPressed } from '../../utilities/keys'
import { isString } from '../../utilities/is'
import { noop } from '../../utilities/other'
import get from '../../utilities/get'
import { createLocation } from '../../utilities/history'

export interface Props {
  fetch: () => Promise<any>
  href?: string
  onClick: (event: Event) => void
  replace: boolean
  target?: string
  to?: string
}

const RouteWrapper = WrappedComponent => {
  const namespace = getComponentName(WrappedComponent)

  class RouteWrapperComponent extends React.Component<Props> {
    static contextTypes = {
      router: () => {},
    }

    static defaultProps = {
      onClick: noop,
      fetch: () => Promise.resolve(),
      replace: false,
    }

    static displayName = `withRoute(${namespace})`

    handleOnClick = event => {
      const { fetch, replace, to } = this.props
      const history = get(this, 'context.router.history')

      this.props.onClick(event)

      if (!to || !history) return

      // Allow ctrl + clicks + non-left-clicks to function normally
      /* istanbul ignore next */
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
      const { href, to } = this.props
      const createHref = get(this, 'context.router.history.createHref')

      if (isString(to) && createHref) {
        const contextLocation = get(this, 'context.router.route.location')
        const location =
          contextLocation && createLocation(to, null, null, contextLocation)

        return location ? createHref(location) : /* istanbul ignore next */ ''
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

  return hoistNonReactStatics(RouteWrapperComponent, WrappedComponent)
}

export default RouteWrapper
