// @flow
import { propConnect } from '../PropProvider'
import Page from './Page'

Page.Actions = propConnect('PageActions')(Page.Actions)
Page.Card = propConnect('PageCard')(Page.Card)
Page.Header = propConnect('PageHeader')(Page.Header)

export default propConnect('Page')(Page)
