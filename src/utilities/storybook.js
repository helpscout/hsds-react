import React from 'react'
import styled from 'styled-components'
import { HsApp } from '../components/index'

export class WithAktiv extends React.Component {
  componentDidMount() {
    document.body.classList.add('with-aktiv')
  }

  componentWillUnmount() {
    document.body.classList.remove('with-aktiv')
  }

  render() {
    return this.props.children
  }
}

export const withAktiv = storyFn => <WithAktiv>{storyFn()}</WithAktiv>

export const withHsApp = storyFn => (
  <WithAktiv>
    <HsApp>{storyFn()}</HsApp>
  </WithAktiv>
)

const AppUI = styled('div')`
  align-items: center;
  background: #f9fafa;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: calc(100vh);
  width: 100%;

  @media (min-width: 1500px) {
    padding: 40px 20px;
  }
`

export const PageDecorator = storyFn => <AppUI>{storyFn()}</AppUI>
