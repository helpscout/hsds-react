import React from 'react'
import { mount } from 'enzyme'
import PreviewCard from '../index'
import Context from '../Context'
import { baseComponentTest } from '../../../tests/helpers/components'
import { Card, Heading, Text } from '../../'

const ui = {
  base: '.c-PreviewCard',
}

const baseComponentOptions = {
  className: 'c-PreviewCard',
}

baseComponentTest(PreviewCard, baseComponentOptions)

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
    const o = wrapper.find(Heading)

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-PreviewCard__title')).toBeTruthy()
    expect(o.getNode().props.children).toBe('Mugatu')
  })
})

describe('Text', () => {
  test('Renders children in a Text component', () => {
    const wrapper = mount(<PreviewCard title="Mugatu">Relax</PreviewCard>)
    const o = wrapper.find(Text)

    expect(o.length).toBeTruthy()
    expect(o.hasClass('c-PreviewCard__content')).toBeTruthy()
    expect(o.getNode().props.children).toBe('Relax')
  })
})

describe('Context', () => {
  test('Can consume properties from context', () => {
    const wrapper = mount(
      <Context.Provider value={{ isNote: true }}>
        <PreviewCard />
      </Context.Provider>
    )
    const o = wrapper.find(ui.base)

    expect(o.hasClass('is-note')).toBe(true)

    wrapper.setProps({ value: { isNote: false } })

    expect(o.hasClass('is-note')).toBe(false)
  })
})
