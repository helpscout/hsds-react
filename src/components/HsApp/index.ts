import { propConnect } from '../PropProvider'
import HsApp from './HsApp'
import { COMPONENT_KEY } from './HsApp.utils'

HsApp.Nav = propConnect(COMPONENT_KEY.Nav)(HsApp.Nav)
HsApp.Sidenav = propConnect(COMPONENT_KEY.Sidenav)(HsApp.Sidenav)

export default propConnect(COMPONENT_KEY.HsApp)(HsApp)
