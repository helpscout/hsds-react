import { propConnect } from '../PropProvider/index'
import Attachment from './Attachment'
import { COMPONENT_KEY } from './utils'
export { Provider } from './Attachment'

export default propConnect(COMPONENT_KEY)(Attachment)
