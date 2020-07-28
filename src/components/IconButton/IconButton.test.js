import React from 'react'
import { cy } from '@helpscout/cyan'
import IconButton from './IconButton'
import '../../adapters/app'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<IconButton />)

    expect(wrapper.hasClass('c-IconButton')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<IconButton className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Icon', () => {
  test('Renders an Icon component', () => {
    cy.render(<IconButton />)
    expect(cy.get('.c-Icon').exists()).toBeTruthy()
  })

  test('Renders an Icon SVG', () => {
    const wrapper = cy.render(<IconButton />)

    expect(wrapper.find('svg').exists()).toBeTruthy()
  })

  test('Can customize Icon SVG', () => {
    const wrapper = cy.render(<IconButton icon="chat" />)

    expect(wrapper.find('[data-icon-name="chat"]').exists()).toBeTruthy()
    expect(wrapper.find('svg').exists()).toBeTruthy()
  })

  test('Can customize Icon size', () => {
    const wrapper = cy.render(<IconButton icon="chat" iconSize={20} />)
    const icon = wrapper.get('.c-Icon')

    expect(icon.style('height')).toBe('20px')
    expect(icon.style('width')).toBe('20px')
  })

  test('Can render with caret', () => {
    const wrapper = cy.render(<IconButton withCaret />)
    const icon = wrapper.get('.c-Icon')

    expect(icon.find('.is-caret').exists()).toBeTruthy()
  })

  test('Does not render with caret by default', () => {
    const wrapper = cy.render(<IconButton />)
    const icon = wrapper.get('.c-Icon')

    expect(icon.find('.is-caret').exists()).toBeFalsy()
  })

  test('Auto adjusts Icon size, if Button size is smaller', () => {
    const wrapper = cy.render(<IconButton icon="chat" iconSize={24} />)
    let icon

    wrapper.setProps({ size: 'sm' })

    icon = wrapper.get('.c-Icon')
    expect(icon.style('height')).toBe('18px')
    expect(icon.style('width')).toBe('18px')

    wrapper.setProps({ size: 'xs' })

    icon = wrapper.get('.c-Icon')
    expect(icon.style('height')).toBe('16px')
    expect(icon.style('width')).toBe('16px')
  })
})

describe('Button', () => {
  test('Renders a button', () => {
    cy.render(<IconButton />)

    expect(cy.getByCy('IconButton').exists()).toBeTruthy()
    expect(cy.get('button').exists()).toBeTruthy()
  })

  test('Renders a button with various kinds', () => {
    const wrapper = cy.render(<IconButton kind="primary" />)

    expect(wrapper.hasClass('is-primary')).toBeTruthy()

    wrapper.setProps({ kind: 'secondary' })

    expect(wrapper.hasClass('is-secondary')).toBeTruthy()
  })

  test('Renders a button with various sizes', () => {
    const wrapper = cy.render(<IconButton size="lg" />)

    expect(wrapper.hasClass('is-lg')).toBeTruthy()

    wrapper.setProps({ size: 'xs' })

    expect(wrapper.hasClass('is-xs')).toBeTruthy()
  })
})

describe('Events', () => {
  test('onClick callback still works', () => {
    const spy = jest.fn()
    const wrapper = cy.render(<IconButton onClick={spy} />)

    wrapper.click()

    expect(spy).toHaveBeenCalled()
  })

  test('onBlur callback still works', () => {
    const spy = jest.fn()
    const wrapper = cy.render(<IconButton onBlur={spy} />)

    wrapper.blur()

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus callback still works', () => {
    const spy = jest.fn()
    const wrapper = cy.render(<IconButton onFocus={spy} />)

    wrapper.focus()

    expect(spy).toHaveBeenCalled()
  })

  test('Clicking on the Icon propagates event to Button', () => {
    const spy = jest.fn()
    const wrapper = cy.render(<IconButton onClick={spy} />)

    wrapper.get('.c-Icon').click()

    expect(spy).toHaveBeenCalled()
  })
})

describe('Styles', () => {
  test('Renders borderless, by default', () => {
    const wrapper = cy.render(<IconButton />)
    expect(wrapper.style('border-color')).toBe('transparent')
  })

  test('Can render with border styles', () => {
    const wrapper = cy.render(
      <IconButton kind="secondary" isBorderless={false} />
    )

    expect(wrapper.style('border-color')).not.toBe('transparent')
  })

  test('Renders a circle shape, by default', () => {
    const wrapper = cy.render(<IconButton />)
    const borderRadius = wrapper.style('border-radius')
    const value = borderRadius && parseInt(borderRadius, 10)

    expect(value).toBeGreaterThan(100)
  })

  test('Shape can be set to not render a circle', () => {
    const wrapper = cy.render(<IconButton shape="default" />)
    const borderRadius = wrapper.style('border-radius')
    const value = borderRadius && parseInt(borderRadius, 10)

    expect(value).toBeLessThan(100)
  })
})
