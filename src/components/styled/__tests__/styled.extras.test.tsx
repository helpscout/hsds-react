import * as React from 'react'
import { cy } from '@helpscout/cyan'
import styled from '../index'

const { _ } = styled
const { getColor, makeFontFamily, rgb } = _

describe('Extras', () => {
  test('Can getColor from extras', () => {
    const Component = styled('div')`
      color: ${getColor('green.500')};
    `

    cy.render(<Component />)

    expect(cy.get('div').style('color')).toBe(rgb(getColor('green.500')))
  })

  test('Can set font-family from extras', () => {
    const fontFamily = makeFontFamily('Barlow')
    const Component = styled('div')`
      ${fontFamily};
    `

    cy.render(<Component />)

    expect(cy.get('div').style('font-family')).toContain('Barlow')
  })

  test('Can use extras from style interpolation', () => {
    const Component = styled('div')`
      ${({ _: extras }) => `
        color: ${extras.getColor('red.500')};
      `};
    `

    cy.render(<Component />)

    expect(cy.get('div').style('color')).toBe(rgb(getColor('red.500')))
  })
})
