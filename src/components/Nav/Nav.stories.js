import React from 'react'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import { boolean, text } from '@storybook/addon-knobs'
import Toolbar from '../Toolbar'
import Nav from '.'

export default {
  component: Nav,
  title: 'Components/Wayfinding/Nav',
}

const RouteComponent = () => <div />

const BaseNav = () => {
  const itemHome = text('itemHomeText', 'Home')
  const itemOne = text('itemOneText', 'One')
  const itemTwo = text('itemTwoText', 'Two')
  const itemThree = text('itemThreeText', 'Three')
  const itemThreeError = text('itemThreeError', 'Something went wrong')
  const itemFour = text('itemFourText', 'Four')
  const itemFourDisabled = boolean('itemFourDisabled', true)

  return (
    <Nav>
      <Nav.Item to="/">{itemHome}</Nav.Item>
      <Nav.Item to="/one">{itemOne}</Nav.Item>
      <Nav.Item to="/two">{itemTwo}</Nav.Item>
      <Nav.Item to="/three" error={itemThreeError}>
        {itemThree}
      </Nav.Item>
      <Nav.Item to="/four" disabled={itemFourDisabled}>
        {itemFour}
      </Nav.Item>
    </Nav>
  )
}

export const Default = () => (
  <Router>
    <div>
      <BaseNav />
      <Route exact path="/" component={RouteComponent} />
      <Route exact path="/one" component={RouteComponent} />
      <Route exact path="/two" component={RouteComponent} />
      <Route exact path="/three" component={RouteComponent} />
    </div>
  </Router>
)

export const _Toolbar = () => {
  // Solution to work around React-Router's rendering
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
  const NavBar = () => (
    <Toolbar>
      <Toolbar.Block>
        <BaseNav />
      </Toolbar.Block>
    </Toolbar>
  )

  return (
    <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={RouteComponent} />
        <Route exact path="/one" component={RouteComponent} />
        <Route exact path="/two" component={RouteComponent} />
        <Route exact path="/three" component={RouteComponent} />
      </div>
    </Router>
  )
}
