import React from 'react'
import { storiesOf } from '@storybook/react'
import { TabBar } from '../src/index.js'
import Dropdown from '../src/components/Dropdown/V2/'
import Button from '../src/components/Button'

import { MemoryRouter as Router, Route } from 'react-router-dom'
import { createSpec, faker } from '@helpscout/helix'

import { withAktiv, withHsApp } from './utils'

import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
})

const itemHome = text('itemHomeText', 'Home')
const itemOne = text('itemOneText', 'One')
const itemTwo = text('itemTwoText', 'Two')
const itemThree = text('itemThreeText', 'Three')
const itemThreeError = text('itemThreeError', 'Something went wrong')
const itemFour = text('itemFourText', 'Four')
const itemFourDisabled = boolean('itemFourDisabled', true)

const routerDecorator = storyFn => {
  return <Router>{storyFn()}</Router>
}

const stories = storiesOf('TabBar', module)
stories.addDecorator(withAktiv)
stories.addDecorator(routerDecorator)

const renderTabBarItem = () => {
  return [
    <TabBar.Item key="home" to="/">
      {itemHome}
    </TabBar.Item>,
    <TabBar.Item key="one" to="/one">
      {itemOne}
    </TabBar.Item>,
    <TabBar.Item key="two" to="/two">
      {itemTwo}
    </TabBar.Item>,
    <TabBar.Item key="three" to="/three" error={itemThreeError}>
      {itemThree}
    </TabBar.Item>,
    <TabBar.Item key="four" to="/four" disabled={itemFourDisabled}>
      {itemFour}
    </TabBar.Item>,
  ]
}

const dropdownContent = (
  <Dropdown
    direction="left"
    items={ItemSpec.generate(8)}
    renderTrigger={
      <Button version={2} kind="link">
        Dropdown
      </Button>
    }
  />
)

stories.add('default', () => <TabBar>{renderTabBarItem()}</TabBar>)

stories.add('with right content', () => {
  const rightContent = (
    <span>
      <b>13,456</b> items
    </span>
  )
  return <TabBar rightContent={rightContent}>{renderTabBarItem()}</TabBar>
})

stories.add('with right dropdown', () => {
  return <TabBar rightContent={dropdownContent}>{renderTabBarItem()}</TabBar>
})

const storiesHsApp = storiesOf('TabBar/HS App', module)
storiesHsApp.addDecorator(withHsApp)
storiesHsApp.addDecorator(routerDecorator)
storiesHsApp.add('with right content', () => {
  const rightContent = (
    <span>
      <b>13,456</b> items
    </span>
  )
  return <TabBar rightContent={rightContent}>{renderTabBarItem()}</TabBar>
})

storiesHsApp.add('with right dropdown', () => {
  return <TabBar rightContent={dropdownContent}>{renderTabBarItem()}</TabBar>
})
