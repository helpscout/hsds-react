import {
  propProviderAppNamespace
} from './utils'

export type AppNamespace = string

export type PropProviderProps = {
  [propProviderAppNamespace]: AppNamespace
}

export type ConfigGetter = Array<string> | string | ((config: Object) => {})