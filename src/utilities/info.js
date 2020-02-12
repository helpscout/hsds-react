import pkg from './pkg'

export const HSDS_REACT_NAMESPACE = 'HSDSReact'

export const getPackageVersion = () => pkg.version

export const setGlobalNamespace = () => {
  /* istanbul ignore next */
  if (window[HSDS_REACT_NAMESPACE]) return

  window[HSDS_REACT_NAMESPACE] = {
    url: 'https://github.com/helpscout/hsds-react/',
  }
}

export const setPackageVersionToGlobal = () => {
  setGlobalNamespace()
  window[HSDS_REACT_NAMESPACE].version = getPackageVersion()
}
