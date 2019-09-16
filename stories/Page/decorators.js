import React from 'react'
import styled from 'styled-components'

export const App = storyFn => <AppUI>{storyFn()}</AppUI>

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
