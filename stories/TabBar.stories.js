import React from 'react'
import { storiesOf } from '@storybook/react'
import { TabBar } from '../src/index'
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

const routerDecorator = storyFn => {
  return <Router>{storyFn()}</Router>
}

const stories = storiesOf('TabBar', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withAktiv)
stories.addDecorator(routerDecorator)

const renderTabBarItem = () => {
  const itemHome = text('itemHomeText', 'Home')
  const itemOne = text('itemOneText', 'One')
  const itemTwo = text('itemTwoText', 'Two')
  const itemThree = text('itemThreeText', 'Three')
  const itemThreeError = text('itemThreeError', 'Something went wrong')
  const itemFour = text('itemFourText', 'Four')
  const itemFourDisabled = boolean('itemFourDisabled', true)

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
    renderTrigger={<Button kind="link">Dropdown</Button>}
  />
)

stories.add('default', () => <TabBar>{renderTabBarItem()}</TabBar>)

stories.add('center align', () => (
  <TabBar align="center">{renderTabBarItem()}</TabBar>
))

stories.add('right align', () => (
  <TabBar align="right">{renderTabBarItem()}</TabBar>
))

stories.add('with secondary content', () => {
  const secContent = (
    <span>
      <b>13,456</b> items
    </span>
  )
  return <TabBar secContent={secContent}>{renderTabBarItem()}</TabBar>
})

stories.add('right align with secondary content', () => {
  const secContent = (
    <span>
      <b>13,456</b> items
    </span>
  )
  return (
    <TabBar align="right" secContent={secContent}>
      {renderTabBarItem()}
    </TabBar>
  )
})

stories.add('with secondary content dropdown', () => {
  return <TabBar secContent={dropdownContent}>{renderTabBarItem()}</TabBar>
})

const storiesHsApp = storiesOf('TabBar/HS App', module)
storiesHsApp.addDecorator(withKnobs)
storiesHsApp.addDecorator(withHsApp)
storiesHsApp.addDecorator(routerDecorator)
storiesHsApp.add('with secondary content', () => {
  const secContent = (
    <span>
      <b>13,456</b> items
    </span>
  )
  return <TabBar secContent={secContent}>{renderTabBarItem()}</TabBar>
})

storiesHsApp.add('with secondary dropdown', () => {
  return <TabBar secContent={dropdownContent}>{renderTabBarItem()}</TabBar>
})
