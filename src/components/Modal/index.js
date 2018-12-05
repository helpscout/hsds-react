// @flow
import { propConnect } from '../PropProvider'
import Modal from './Modal'
import { COMPONENT_KEY } from './utils'

Modal.Body = propConnect(COMPONENT_KEY.Body)(Modal.Body)
Modal.Content = propConnect(COMPONENT_KEY.Content)(Modal.Content)
Modal.Footer = propConnect(COMPONENT_KEY.Footer)(Modal.Footer)
Modal.Header = propConnect(COMPONENT_KEY.Header)(Modal.Header)
Modal.Overlay = propConnect(COMPONENT_KEY.Overlay)(Modal.Overlay)

export default propConnect(COMPONENT_KEY.Modal, { pure: false })(Modal)
