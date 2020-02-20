/* istanbul ignore file */
import warning from 'warning'
import invariant from 'invariant'
import React from 'react'
import { noop } from '../../utilities/other'
import matchPath from '../../utilities/react-router/matchPath'

const isEmptyChildren = children => React.Children.count(children) === 0

/**
 * Forked from React Router @ 4.3.1
 * https://github.com/ReactTraining/react-router/blob/3d233bf0b6dd5bf68d9bac9c94273ae25646b207/packages/react-router/modules/Route.js
 */
class Route extends React.Component {
  // static propTypes = {
  //   computedMatch: PropTypes.object, // private, from <Switch>
  //   path: PropTypes.string,
  //   exact: PropTypes.bool,
  //   strict: PropTypes.bool,
  //   sensitive: PropTypes.bool,
  //   component: PropTypes.func,
  //   render: PropTypes.func,
  //   children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  //   location: PropTypes.object,
  // }

  static contextTypes = {
    router: noop,
  }

  static childContextTypes = {
    router: noop,
  }

  getChildContext() {
    return {
      router: {
        ...this.context.router,
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match,
        },
      },
    }
  }

  state = {
    match: this.computeMatch(this.props, this.context.router),
  }

  computeMatch(
    { computedMatch, location, path, strict, exact, sensitive },
    router
  ) {
    if (computedMatch) return computedMatch // <Switch> already computed the match for us

    invariant(
      router,
      'You should not use <Route> or withRouter() outside a <Router>'
    )

    const { route } = router
    const pathname = (location || route.location).pathname

    return matchPath(pathname, { path, strict, exact, sensitive }, route.match)
  }

  UNSAFE_componentWillMount() {
    warning(
      !(this.props.component && this.props.render),
      'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored'
    )

    warning(
      !(
        this.props.component &&
        this.props.children &&
        !isEmptyChildren(this.props.children)
      ),
      'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored'
    )

    warning(
      !(
        this.props.render &&
        this.props.children &&
        !isEmptyChildren(this.props.children)
      ),
      'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored'
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    warning(
      !(nextProps.location && !this.props.location),
      '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    )

    warning(
      !(!nextProps.location && this.props.location),
      '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    )

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router),
    })
  }

  render() {
    const { match } = this.state
    const { children, component, render } = this.props
    const { history, route, staticContext } = this.context.router
    const location = this.props.location || route.location
    const props = { match, location, history, staticContext }

    if (component) return match ? React.createElement(component, props) : null

    if (render) return match ? render(props) : null

    if (typeof children === 'function') return children(props)

    if (children && !isEmptyChildren(children))
      return React.Children.only(children)

    return null
  }
}

export default Route
