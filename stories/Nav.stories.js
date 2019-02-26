import React from 'react'
import { storiesOf } from '@storybook/react'
import Nav from '../src/components/Nav'
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
    width: 500,
    height: 200,
    withCenterGuides: false,
    showInterface: false,
  })
)
stories.addDecorator(withKnobs)

const RouteComponent = () => <div />

stories.add('Default', () => (
  <Router>
    <div>
      <Nav>
        <Nav.Item to="/">Home</Nav.Item>
        <Nav.Item to="/one">One</Nav.Item>
        <Nav.Item to="/two">Two</Nav.Item>
        <Nav.Item to="/three">Three</Nav.Item>
      </Nav>
      <Route exact path="/" component={RouteComponent} />
      <Route exact path="/one" component={RouteComponent} />
      <Route exact path="/two" component={RouteComponent} />
      <Route exact path="/three" component={RouteComponent} />
    </div>
  </Router>
))
