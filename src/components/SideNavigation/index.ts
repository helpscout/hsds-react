import { propConnect } from '../PropProvider/index'
import SideNavigation from './SideNavigation'
import { COMPONENT_KEY } from './SideNavigation.utils'

SideNavigation.Button = propConnect(COMPONENT_KEY.Button)(SideNavigation.Button)
SideNavigation.Footer = propConnect(COMPONENT_KEY.Footer)(SideNavigation.Footer)
SideNavigation.Header = propConnect(COMPONENT_KEY.Header)(SideNavigation.Header)
SideNavigation.Item = propConnect(COMPONENT_KEY.Item)(SideNavigation.Item)
SideNavigation.Section = propConnect(COMPONENT_KEY.Section)(
  SideNavigation.Section
)

export default propConnect(COMPONENT_KEY.SideNavigation)(SideNavigation)
