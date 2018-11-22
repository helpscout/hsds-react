type Component = any
type WrappedComponent = any
type Context = {
  Provider: Component
  Consumer: Component
}

declare module '@helpscout/react-utils/dist/classNames' {
  function classNames(...classes: any): string
  export = classNames
}

declare module '@helpscout/react-utils/dist/createContext' {
  function createContext(value: any): Context
  export = createContext
}

declare module '@helpscout/react-utils/dist/getComponentName' {
  function getComponentName(component: Component): string
  export = getComponentName
}

declare module '@helpscout/react-utils/dist/getValidProps' {
  function getValidProps(props: Object): Object
  export = getValidProps
}

declare module '@helpscout/react-utils/dist/hoistNonReactStatics' {
  function hoistNonReactStatics(
    WrappedComponent: WrappedComponent,
    component: Component
  ): WrappedComponent
  export = hoistNonReactStatics
}

declare module '@helpscout/react-utils/dist/renderSpy' {
  function renderSpy(options: any): any
  export = renderSpy
}

declare module '@helpscout/react-utils/dist/perf' {
  function perf(options: any): any
  export = perf
}
