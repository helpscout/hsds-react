// @flow
import { propConnect } from '../PropProvider'
import Illo from './Illo'
export { load, unload } from './Illo'

export default propConnect('Illo')(Illo)
