import {
  propProviderGlobal,
  propProviderAppNamespace
} from './utils'

export type AppNamespace = string

export type PropProviderProps = {
  [propProviderGlobal]: {
    [propProviderAppNamespace]: AppNamespace
  }
}

export type ConfigGetter = Array<string> | string | ((config: Object) => {})