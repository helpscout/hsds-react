import React from 'react'
import styled from '../../src/components/styled'

export const App = storyFn => <AppUI>{storyFn()}</AppUI>

const AppUI = styled('div')`
  align-items: center;
  background: #f9fafa;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vh;
`
