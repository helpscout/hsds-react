import * as React from 'react'
import { cy } from '@helpscout/cyan'
import styled from '../index'

describe('Extras', () => {
  test('Can getColor from extras', () => {
    const Component = styled('div')`
      color: ${styled._.getColor('green.500')};
    `

    cy.render(<Component />)
  })
})
