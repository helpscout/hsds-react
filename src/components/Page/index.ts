import { propConnect } from '../PropProvider'
import Page from './Page'
import { COMPONENT_KEY } from './utils'

Page.Actions = propConnect(COMPONENT_KEY.Actions)(Page.Actions)
Page.Card = propConnect(COMPONENT_KEY.Card)(Page.Card)
Page.Content = propConnect(COMPONENT_KEY.Content)(Page.Content)
Page.Header = propConnect(COMPONENT_KEY.Header)(Page.Header)
Page.Heading = propConnect(COMPONENT_KEY.Heading)(Page.Heading)

export default propConnect(COMPONENT_KEY.Page)(Page)
