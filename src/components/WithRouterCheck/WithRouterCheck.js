import React, { useContext, useMemo, useRef } from 'react'
import { __RouterContext, withRouter } from 'react-router'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import getComponentName from '@helpscout/react-utils/dist/getComponentName'

// This HoC checks if there is Router context present, if yes, it wraps provided Component with `withRouter`
// This is necessary for backward compatibility after upgrading react-router version
// Previously old Context API has been used, so there was no need to check, but now there is error thrown if Context is not present
// some components are used without Router Context present, so this check is to not break them
function WithRouterCheck(WrappedComponent) {
  const namespace = getComponentName(WrappedComponent)

  const Wrapper = React.forwardRef((props, ref) => {
    const routerContext = useContext(__RouterContext)
    const previousComponent = useRef()

    const Component = useMemo(() => {
      if (routerContext) {
        // Let's remember and re-use previous component if it had router context and it has changed
        // It would not break anything, but prevent from recreating component from scratch in case of re-rendering
        // this case might be only for testing purposes, but I might have just not encounter it in real case yet
        // in tests this occur when calling `rerender` from react-testing-library
        const currentComponent = previousComponent.current
          ? previousComponent.current
          : withRouter(WrappedComponent)
        previousComponent.current = currentComponent
        return currentComponent
      }
      return WrappedComponent
    }, [routerContext])

    const refProps = useMemo(() => {
      const refKey = routerContext ? 'wrappedComponentRef' : 'ref'
      return ref ? { [refKey]: ref } : {}
    }, [routerContext, ref])

    return <Component {...refProps} {...props} />
  })

  Wrapper.displayName = `withRouterCheck(${namespace})`

  return hoistNonReactStatics(Wrapper, WrappedComponent)
}

export default WithRouterCheck
