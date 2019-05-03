import PropProvider from './PropProvider'
export { default as Provider } from './Provider'
export { default as propConnect } from './propConnect'
export { default as contextConnect } from './contextConnect'

export {
  APPS,
  getGlobalApp,
  getGlobalAppFromProps,
  isBeacon,
  isHSApp,
} from './PropProvider.utils'

export default PropProvider
