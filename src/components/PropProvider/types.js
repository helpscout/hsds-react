export type PropProviderProps = Object | ((props?: Object) => Object)

export type ConfigGetter = Array<string> | string | ((config: Object) => {})