import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import Nav from '.'
export default {
  component: Nav,
  title: 'Components/Wayfinding/Nav',
}

export const Default = () => (
  <Router>
    <Nav>
      <Nav.Item to="/">Home</Nav.Item>
      <Nav.Item to="/one">One</Nav.Item>
      <Nav.Item to="/two">Two</Nav.Item>
      <Nav.Item to="/three" error={'Something went wrong'}>
        Three
      </Nav.Item>
      <Nav.Item to="/four" disabled>
        Four
      </Nav.Item>
    </Nav>
  </Router>
)
