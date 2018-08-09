// @flow
import { propConnect } from '../PropProvider'
import Card from './Card'
import Page from './Page'
import Header from './Header'

Page.Card = propConnect('PageCard')(Card)
Page.Header = propConnect('PageHeader')(Header)

export default propConnect('Page')(Page)
