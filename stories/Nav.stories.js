import React from 'react'
import { storiesOf } from '@storybook/react'
import Nav from '../src/components/Nav'
import NavLink from '../src/components/NavLink'
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
  })
)
stories.addDecorator(withKnobs)

const RouteComponent = () => <div />

stories.add('Default', () => (
  <Router>
    <div>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/one">One</NavLink>
        <NavLink to="/two">Two</NavLink>
        <NavLink to="/three">Three</NavLink>
      </Nav>
      <Route exact path="/" component={RouteComponent} />
      <Route exact path="/one" component={RouteComponent} />
      <Route exact path="/two" component={RouteComponent} />
      <Route exact path="/three" component={RouteComponent} />
    </div>
  </Router>
))
