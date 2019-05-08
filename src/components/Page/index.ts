import { propConnect } from '../PropProvider'
import Page from './Page'
import { COMPONENT_KEY } from './Page.utils'

Page.Actions = propConnect(COMPONENT_KEY.Actions)(Page.Actions)
Page.Card = propConnect(COMPONENT_KEY.Card)(Page.Card)
Page.Content = propConnect(COMPONENT_KEY.Content)(Page.Content)
Page.Header = propConnect(COMPONENT_KEY.Header)(Page.Header)
Page.Section = propConnect(COMPONENT_KEY.Section)(Page.Section)

export default propConnect(COMPONENT_KEY.Page)(Page)
