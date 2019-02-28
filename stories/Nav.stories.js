import React from 'react'
import { storiesOf } from '@storybook/react'
import Nav from '../src/components/Nav'
import Toolbar from '../src/components/Toolbar'
import { MemoryRouter as Router, Route } from 'react-router-dom'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('Nav', module)

stories.addDecorator(
  withArtboard({
    width: 600,
    height: 200,
    withCenterGuides: false,
    withResponsiveWidth: true,
    showInterface: false,
  })
)

const RouteComponent = () => <div />

stories.add('Default', () => (
  <Router>
    <div>
      <Nav>
        <Nav.Item to="/">Home</Nav.Item>
        <Nav.Item to="/one">One</Nav.Item>
        <Nav.Item to="/two">Two</Nav.Item>
        <Nav.Item to="/three" error="Something went wrong">
          Three
        </Nav.Item>
        <Nav.Item to="/four" disabled>
          Four
        </Nav.Item>
      </Nav>
      <Route exact path="/" component={RouteComponent} />
      <Route exact path="/one" component={RouteComponent} />
      <Route exact path="/two" component={RouteComponent} />
      <Route exact path="/three" component={RouteComponent} />
    </div>
  </Router>
))

stories.add('Toolbar', () => {
  // Solution to work around React-Router's rendering
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
  const NavBar = () => (
    <Toolbar>
      <Toolbar.Block>
        <Nav>
          <Nav.Item to="/">Home</Nav.Item>
          <Nav.Item to="/one">One</Nav.Item>
          <Nav.Item to="/two">Two</Nav.Item>
          <Nav.Item to="/three" error="Something went wrong">
            Three
          </Nav.Item>
          <Nav.Item to="/four" disabled>
            Four
          </Nav.Item>
        </Nav>
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
})
