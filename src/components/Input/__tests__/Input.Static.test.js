import React from 'react'
import { cy } from '@helpscout/cyan'
import Static from '../Input.Static'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = cy.render(<Static />)

    expect(wrapper.hasClass('c-InputStatic')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = cy.render(<Static className="mugatu" />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = cy.render(
      <Static>
        <div className="mugatu" />
      </Static>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = cy.render(<Static style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Size', () => {
  test('Can render an additional size', () => {
    const wrapper = cy.render(<Static size="md" />)

    expect(wrapper.hasClass('c-InputStatic')).toBeTruthy()
    expect(wrapper.hasClass('is-md')).toBeTruthy()
  })
})

describe('Alignment', () => {
  test('Can be aligned left', () => {
    const wrapper = cy.render(<Static align="left" />)

    expect(wrapper.hasClass('c-InputStatic')).toBeTruthy()
    expect(wrapper.hasClass('is-left')).toBeTruthy()
  })

  test('Can be aligned center', () => {
    const wrapper = cy.render(<Static align="center" />)

    expect(wrapper.hasClass('c-InputStatic')).toBeTruthy()
    expect(wrapper.hasClass('is-center')).toBeTruthy()
  })

  test('Can be aligned right', () => {
    const wrapper = cy.render(<Static align="right" />)

    expect(wrapper.hasClass('c-InputStatic')).toBeTruthy()
    expect(wrapper.hasClass('is-right')).toBeTruthy()
  })
})

describe('Display', () => {
  test('Is not display: block, by default', () => {
    const wrapper = cy.render(<Static />)

    expect(wrapper.hasClass('is-block')).toBeFalsy()
  })

  test('Can be set to display: block', () => {
    const wrapper = cy.render(<Static isBlock />)

    expect(wrapper.hasClass('is-block')).toBeTruthy()
  })

  test('Can be set to center align items', () => {
    const wrapper = cy.render(<Static isCenterAlign />)

    expect(wrapper.hasClass('is-centerAlign')).toBeTruthy()
  })
})
