import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { Popover } from './Popover'

function mountContent(Component) {
  const wrapper = mount(Component)
  const inst = wrapper.instance()
  // @ts-ignore
  const Content = inst.renderContent({ close: () => {}, placement: 'top' })

  return mount(Content)
}

describe('className', () => {
  test('Has default className', () => {
    cy.render(<Popover />)

    expect(cy.get('.c-Popover').exists()).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    cy.render(<Popover className={customClassName} />)

    expect(cy.get(`.${customClassName}`).exists()).toBeTruthy()
  })
})

describe('Tooltip', () => {
  test('Renders an enhanced Tooltip', () => {
    const wrapper = mount(<Popover content="Hello" />)
    const el = wrapper.find('Tooltip')

    expect(el).toBeTruthy()
  })
})

describe('renderContent', () => {
  test('Can render content', () => {
    const wrapper = mountContent(<Popover content="Hello" />)

    expect(wrapper.text()).toBe('Hello')
  })

  test('Can render header', () => {
    const wrapper = mountContent(<Popover header="Title" />)

    expect(wrapper.text()).toBe('Title')
  })

  test('Can render header and content (string)', () => {
    const wrapper = mountContent(<Popover header="Title" content="Content" />)

    expect(wrapper.text()).toContain('Title')
    expect(wrapper.text()).toContain('Content')
  })

  test('Can render header and content (number)', () => {
    const wrapper = mountContent(<Popover header={123} content={456} />)

    expect(wrapper.text()).toContain('123')
    expect(wrapper.text()).toContain('456')
  })

  test('Can render header and content (components)', () => {
    const wrapper = mountContent(
      <Popover header={<div>123</div>} content={<div>456</div>} />
    )

    expect(wrapper.text()).toContain('123')
    expect(wrapper.text()).toContain('456')
  })

  test('Provides renderHeader with render props', () => {
    const spy = jest.fn()
    mountContent(<Popover renderHeader={spy} content="Content" />)
    const callback = spy.mock.calls[0][0]

    expect(typeof callback.close).toBe('function')
    expect(typeof callback.placement).toBe('string')
    expect(callback.Header).toBeTruthy()
    expect(callback.Title).toBeTruthy()
  })

  test('Provides renderContent with render props', () => {
    const spy = jest.fn()
    mountContent(<Popover renderContent={spy} />)
    const callback = spy.mock.calls[0][0]

    expect(typeof callback.close).toBe('function')
    expect(typeof callback.placement).toBe('string')
    expect(callback.Header).toBeTruthy()
    expect(callback.Title).toBeTruthy()
  })

  test('Renders renderHeader over header', () => {
    const wrapper = mountContent(
      <Popover
        renderHeader={({ Title }) => <Title>Hai</Title>}
        header="Hello"
      />
    )

    expect(wrapper.text()).not.toContain('Hello')
    expect(wrapper.text()).toContain('Hai')
  })

  test('Renders renderContent over content', () => {
    const wrapper = mountContent(
      <Popover
        renderContent={({ Title }) => <Title>Hai</Title>}
        content="Hello"
      />
    )

    expect(wrapper.text()).not.toContain('Hello')
    expect(wrapper.text()).toContain('Hai')
  })
})
