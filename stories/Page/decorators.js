import React from 'react'
import styled from '../../src/components/styled'

export const App = storyFn => <AppUI>{storyFn()}</AppUI>

const AppUI = styled('div')`
  align-items: center;
  background: #f9fafa;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: -40px;
  min-height: calc(100vh);
  min-width: calc(100vw);
`
