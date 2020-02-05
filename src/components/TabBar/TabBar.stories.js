import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { createSpec, faker } from '@helpscout/helix'
import { withAktiv } from '../../utilities/storybook'
import { boolean, text } from '@storybook/addon-knobs'
import { TabBar } from '../index'
import Dropdown from '../Dropdown'
import Button from '../Button'

export default {
  component: TabBar,
  title: 'Components/TabBar',
}

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
})

const routerDecorator = storyFn => {
  return <Router>{storyFn()}</Router>
}

// stories.addDecorator(withAktiv)
// stories.addDecorator(routerDecorator)

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

export const Default = () => <TabBar>{renderTabBarItem()}</TabBar>

Default.story = {
  name: 'default',
}

export const CenterAlign = () => (
  <TabBar align="center">{renderTabBarItem()}</TabBar>
)

CenterAlign.story = {
  name: 'center align',
}

export const RightAlign = () => (
  <TabBar align="right">{renderTabBarItem()}</TabBar>
)

RightAlign.story = {
  name: 'right align',
}

export const WithSecondaryContent = () => {
  const secContent = (
    <span>
      <b>13,456</b> items
    </span>
  )
  return <TabBar secContent={secContent}>{renderTabBarItem()}</TabBar>
}

WithSecondaryContent.story = {
  name: 'with secondary content',
}

export const RightAlignWithSecondaryContent = () => {
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
}

RightAlignWithSecondaryContent.story = {
  name: 'right align with secondary content',
}

export const WithSecondaryContentDropdown = () => {
  return <TabBar secContent={dropdownContent}>{renderTabBarItem()}</TabBar>
}

WithSecondaryContentDropdown.story = {
  name: 'with secondary content dropdown',
}
