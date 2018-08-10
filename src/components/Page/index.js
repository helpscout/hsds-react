// @flow
import { propConnect } from '../PropProvider'
import Actions from './Actions'
import Card from './Card'
import Page from './Page'
import Header from './Header'

Page.Actions = propConnect('PageActions')(Actions)
Page.Card = propConnect('PageCard')(Card)
Page.Header = propConnect('PageHeader')(Header)

export default propConnect('Page')(Page)
