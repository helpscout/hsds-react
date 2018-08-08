// @flow
import Message from './Message'
import { propConnect } from '../PropProvider'
export { default as Provider } from './Provider'

export default propConnect('Message')(Message)
