import * as React from 'react'
import { mount } from 'enzyme'
import PreviewCard from '../PreviewCard'
import Context from '../PreviewCard.Context'
import { Card, Heading, Text } from '../../'

const ui = {
  base: '.c-PreviewCard',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<PreviewCard />)

    expect(wrapper.getDOMNode().classList.contains('c-PreviewCard')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<PreviewCard className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
  })
})

describe('Card', () => {
  test('Extends Card component', () => {
    const wrapper = mount(<PreviewCard />)
    const o = wrapper.find(Card)

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-PreviewCard')).toBeTruthy()
  })
})

describe('Title', () => {
  test('Does not render a title by default', () => {
    const wrapper = mount(<PreviewCard />)
    const o = wrapper.find(Heading)
    const p = wrapper.find('.c-PreviewCard__title')

    expect(o.length).not.toBeTruthy()
    expect(p.length).not.toBeTruthy()
  })

  test('Renders a title, if defined', () => {
    const wrapper = mount(<PreviewCard title="Mugatu" />)
    const o = wrapper.find(Heading).first()

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-PreviewCard__title')).toBeTruthy()
    expect(o.instance().props.children).toBe('Mugatu')
  })
})

describe('Text', () => {
  test('Renders children in a Text component', () => {
    const wrapper = mount(<PreviewCard title="Mugatu">Relax</PreviewCard>)
    const o = wrapper.find(Text).first()

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-PreviewCard__content')).toBeTruthy()
    expect(o.instance().props.children).toBe('Relax')
  })
})

describe('Context', () => {
  test('Can consume properties from context', () => {
    const wrapper = mount(
      <Context.Provider value={{ isNote: true }}>
        <PreviewCard />
      </Context.Provider>
    )
    let o = wrapper.find(ui.base).first()

    expect(o.hasClass('is-note')).toBe(true)

    wrapper.setProps({ value: { isNote: false } })

    o = wrapper.find(ui.base).first()

    expect(o.hasClass('is-note')).toBe(false)
  })
})
